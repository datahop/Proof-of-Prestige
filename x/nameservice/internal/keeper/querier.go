package keeper

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/datahop/sdk-application-tutorial/x/nameservice/internal/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
)

// query endpoints supported by the nameservice Querier
const (
	QueryResolve   = "resolve"
	QueryWhois     = "whois"
	QueryNames     = "names"
	QueryTransfers = "transfers"
	QueryTransfer  = "transfer"
)

// NewQuerier is the module level router for state queries
func NewQuerier(keeper Keeper) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) (res []byte, err sdk.Error) {
		switch path[0] {
		case QueryResolve:
			return queryResolve(ctx, path[1:], req, keeper)
		case QueryWhois:
			return queryWhois(ctx, path[1:], req, keeper)
		case QueryNames:
			return queryNames(ctx, req, keeper)
		case QueryTransfers:
			return queryTransfers(ctx, req, keeper)
		case QueryTransfer:
			return queryTransfer(ctx, path[1:], req, keeper)
		default:
			return nil, sdk.ErrUnknownRequest("unknown nameservice query endpoint")
		}
	}
}

// nolint: unparam
func queryResolve(ctx sdk.Context, path []string, req abci.RequestQuery, keeper Keeper) ([]byte, sdk.Error) {
	value := keeper.ResolveName(ctx, path[0])

	if value == "" {
		return []byte{}, sdk.ErrUnknownRequest("could not resolve name")
	}

	res, err := codec.MarshalJSONIndent(keeper.cdc, types.QueryResResolve{Value: value})
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

// nolint: unparam
func queryWhois(ctx sdk.Context, path []string, req abci.RequestQuery, keeper Keeper) ([]byte, sdk.Error) {
	whois := keeper.GetWhois(ctx, path[0])

	res, err := codec.MarshalJSONIndent(keeper.cdc, whois)
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

func queryNames(ctx sdk.Context, req abci.RequestQuery, keeper Keeper) ([]byte, sdk.Error) {
	var namesList types.QueryResNames

	iterator := keeper.GetNamesIterator(ctx)

	for ; iterator.Valid(); iterator.Next() {
		namesList = append(namesList, string(iterator.Key()))
	}

	res, err := codec.MarshalJSONIndent(keeper.cdc, namesList)
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~

func queryTransfers(ctx sdk.Context, req abci.RequestQuery, keeper Keeper) ([]byte, sdk.Error) {
	var transfersList types.QueryResNames

	iterator := keeper.GetNamesIterator(ctx)

	for ; iterator.Valid(); iterator.Next() {
		transfersList = append(transfersList, string(iterator.Key()))
	}

	res, err := codec.MarshalJSONIndent(keeper.cdc, transfersList)
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}

func queryTransfer(ctx sdk.Context, path []string, req abci.RequestQuery, keeper Keeper) ([]byte, sdk.Error) {
	transfer := keeper.GetTransfer(ctx, path[0])

	res, err := codec.MarshalJSONIndent(keeper.cdc, transfer)
	if err != nil {
		panic("could not marshal result to JSON")
	}

	return res, nil
}
