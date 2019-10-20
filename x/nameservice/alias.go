package nameservice

import (
	"github.com/datahop/sdk-application-tutorial/x/nameservice/internal/keeper"
	"github.com/datahop/sdk-application-tutorial/x/nameservice/internal/types"
)

const (
	ModuleName = types.ModuleName
	RouterKey  = types.RouterKey
	StoreKey   = types.StoreKey
	PKey       = types.Pkey
)

var (
	NewKeeper        = keeper.NewKeeper
	NewQuerier       = keeper.NewQuerier
	NewMsgBuyName    = types.NewMsgBuyName
	NewMsgSetName    = types.NewMsgSetName
	NewMsgDeleteName = types.NewMsgDeleteName
	NewWhois         = types.NewWhois
	ModuleCdc        = types.ModuleCdc
	RegisterCodec    = types.RegisterCodec
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	NewMsgRegisterTransfer = types.NewMsgRegisterTransfer
	NewTransfer            = types.NewTransfer
)

type (
	Keeper            = keeper.Keeper
	MsgSetName        = types.MsgSetName
	MsgBuyName        = types.MsgBuyName
	MsgDeleteName     = types.MsgDeleteName
	QueryResResolve   = types.QueryResResolve
	QueryResNames     = types.QueryResNames
	Whois             = types.Whois
	QueryResTransfers = types.QueryResTransfers
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	MsgRegisterTransfer = types.MsgRegisterTransfer
	//QueryTransfers      = types.QueryTransfers
	//	QueryTransferInfo   = types.QueryTransferInfo
	Transfer = types.Transfer
)
