package types

import "strings"

// QueryResResolve Queries Result Payload for a resolve query
type QueryResResolve struct {
	Value string `json:"value"`
}

// implement fmt.Stringer
func (r QueryResResolve) String() string {
	return r.Value
}

// QueryResNames Queries Result Payload for a names query
type QueryResNames []string

// implement fmt.Stringer
func (n QueryResNames) String() string {
	return strings.Join(n[:], "\n")
}

// QueryResNames Queries Result Payload for a names query
type QueryResTransfers []string

// implement fmt.Stringer
func (n QueryResTransfers) String() string {
	return strings.Join(n[:], "\n")
}
