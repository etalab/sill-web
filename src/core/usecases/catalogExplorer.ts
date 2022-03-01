import type { ThunkAction } from "../setup";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Software } from "sill-api";
import { id } from "tsafe/id";
import { assert } from "tsafe/assert";
import type { ThunksExtraArgument, RootState } from "../setup";
import { waitForDebounceFactory } from "core/tools/waitForDebounce";
import memoize from "memoizee";
import { exclude } from "tsafe/exclude";

type CatalogExplorerState = CatalogExplorerState.NotFetched | CatalogExplorerState.Ready;

namespace CatalogExplorerState {
    export type Common = {
        search: string;
    };

    export type NotFetched = Common & {
        stateDescription: "not fetched";
        isFetching: boolean;
    };

    export type Ready = Common & {
        stateDescription: "ready";
        "~internal": {
            softwares: Software[];
            displayCount: number;
        };
    };
}

export const { name, reducer, actions } = createSlice({
    "name": "catalogExplorer",
    "initialState": id<CatalogExplorerState>(
        id<CatalogExplorerState.NotFetched>({
            "stateDescription": "not fetched",
            "isFetching": false,
            "search": "",
        }),
    ),
    "reducers": {
        "catalogsFetching": state => {
            assert(state.stateDescription === "not fetched");
            state.isFetching = true;
        },
        "catalogsFetched": (
            state,
            {
                payload,
            }: PayloadAction<{
                softwares: Software[];
            }>,
        ) => {
            const { softwares } = payload;

            return id<CatalogExplorerState.Ready>({
                "stateDescription": "ready",
                "~internal": {
                    softwares,
                    "displayCount": 24,
                },
                "search": state.search,
            });
        },
        "setSearch": (state, { payload }: PayloadAction<{ search: string }>) => {
            const { search } = payload;

            state.search = search;

            if (search === "" && state.stateDescription === "ready") {
                state["~internal"].displayCount = 24;
            }
        },
        "moreLoaded": state => {
            assert(state.stateDescription === "ready");

            state["~internal"].displayCount += 24;
        },
    },
});

export const thunks = {
    "fetchCatalogs":
        (): ThunkAction =>
        async (...args) => {
            const [dispatch, , { sillApiClient }] = args;

            dispatch(actions.catalogsFetching());

            const softwares = await sillApiClient.getSoftware();

            dispatch(actions.catalogsFetched({ softwares }));
        },
    "setSearch":
        (params: { search: string }): ThunkAction =>
        async (...args) => {
            const { search } = params;
            const [dispatch, , extra] = args;

            const sliceContext = getSliceContext(extra);

            const { prevSearch, waitForSearchDebounce } = sliceContext;

            sliceContext.prevSearch = search;

            //NOTE: At least 3 character to trigger search
            if (search !== "" && search.length <= 2) {
                return;
            }

            debounce: {
                //NOTE: We do note debounce if we detect that the search was restored from url or pasted.
                if (Math.abs(search.length - prevSearch.length) > 1) {
                    break debounce;
                }

                await waitForSearchDebounce();
            }

            dispatch(actions.setSearch({ search }));
        },
    "loadMore":
        (): ThunkAction =>
        async (...args) => {
            const [dispatch] = args;

            dispatch(actions.moreLoaded());
        },
    "getHasMoreToLoad":
        (): ThunkAction<boolean> =>
        (...args) => {
            const [, getState] = args;

            const state = getState().catalogExplorer;

            assert(state.stateDescription === "ready");

            const { displayCount, softwares } = state["~internal"];

            return state.search === "" && displayCount < softwares.length;
        },
};

const getSliceContext = memoize((_: ThunksExtraArgument) => {
    const { waitForDebounce } = waitForDebounceFactory({ "delay": 750 });
    return {
        "waitForSearchDebounce": waitForDebounce,
        "prevSearch": "",
    };
});

export const selectors = (() => {
    const getSoftwareWeight = memoize(
        (software: Software): number =>
            JSON.stringify(software).length -
            (software.wikidata?.logoUrl === undefined ? 10000 : 0),
    );

    const filteredSoftwares = (rootState: RootState) => {
        const state = rootState.catalogExplorer;

        if (state.stateDescription !== "ready") {
            return undefined;
        }

        const {
            search,
            "~internal": { softwares, displayCount },
        } = state;

        return [...softwares]
            .sort((a, b) => getSoftwareWeight(b) - getSoftwareWeight(a))
            .slice(0, search === "" ? displayCount : softwares.length)
            .filter(
                search === ""
                    ? () => true
                    : ({
                          name,
                          function: fn,
                          license,
                          comptoirDuLibreSoftware,
                          wikidata,
                      }) =>
                          [
                              name,
                              fn,
                              license,
                              comptoirDuLibreSoftware?.name,
                              wikidata?.descriptionFr,
                              wikidata?.descriptionFr,
                              wikidata?.sourceUrl,
                              wikidata?.websiteUrl,
                          ]
                              .map(e => (!!e ? e : undefined))
                              .filter(exclude(undefined))
                              .map(str =>
                                  str.toLowerCase().includes(search.toLowerCase()),
                              )
                              .indexOf(true) >= 0,
            );
    };

    return { filteredSoftwares };
})();