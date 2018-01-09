package medium

/* This is the interface that provides with
   all definitions method´s that a channel should
   implement to be able to deliver and receive messages
   that will be translated into the real messages for
   the logic server
 */
type Channeler interface{
    SendMessage() error
    GetMessage() string
    Event() error
}