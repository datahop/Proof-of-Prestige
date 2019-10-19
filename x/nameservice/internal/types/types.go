package types

import (
	"fmt"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// MinNamePrice is Initial Starting Price for a name that was never previously owned
var MinNamePrice = sdk.Coins{sdk.NewInt64Coin("nametoken", 1)}

// Whois is a struct that contains all the metadata of a name
type Whois struct {
	Value string         `json:"value"`
	Owner sdk.AccAddress `json:"owner"`
	Price sdk.Coins      `json:"price"`
}

// NewWhois returns a new Whois with the minprice as the price
func NewWhois() Whois {
	return Whois{
		Price: MinNamePrice,
	}
}

// implement fmt.Stringer
func (w Whois) String() string {
	return strings.TrimSpace(fmt.Sprintf(`Owner: %s
Value: %s
Price: %s`, w.Owner, w.Value, w.Price))
}

// Transfer is a struct that contains all the metadata of a transfer
type Transfer struct {
	Sender   sdk.AccAddress `json:"sender"`
	Receiver sdk.AccAddress `json:"receiver"`
	Prestige uint           `json:"price"`
	Filename string         `json:"filename"`
}

// Transfer returns a new Transfer
func NewTransfer() Transfer {
	return Transfer{
		Filename: " ",
	}
}

// implement fmt.Stringer
func (t Transfer) String() string {
	return strings.TrimSpace(fmt.Sprintf(`Sender: %s
Receiver: %s
Prestige: %d
Filename: %s`, t.Sender, t.Receiver, t.Prestige, t.Filename))
}

//File structure for register files
type File struct {
	Filename string         `json:"filename"`
	Owner    sdk.AccAddress `json:"owner"`
}
