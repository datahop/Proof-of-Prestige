package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// DefaultCodespace is the Module Name
const (
	DefaultCodespace sdk.CodespaceType = ModuleName

	CodeNameDoesNotExist sdk.CodeType = 101

	CodeFileDoesNotExist sdk.CodeType = 102
)

// ErrNameDoesNotExist is the error for name not existing
func ErrNameDoesNotExist(codespace sdk.CodespaceType) sdk.Error {
	return sdk.NewError(codespace, CodeNameDoesNotExist, "Name does not exist")
}

// ErrFileDoesNotExist is the error for name not existing
func FileDoesNotExist(codespace sdk.CodespaceType) sdk.Error {
	return sdk.NewError(codespace, CodeFileDoesNotExist, "File does not exist")
}
