package service

import (
	"github.com/diegoseso/snake-charmer/messaging/medium"
)

type MessagingService struct{
	Repo *medium.Channeler
}

func NewMessagingService( Repo *medium.Channeler ) *MessagingService{
	return &MessagingService{ Repo: Repo}
}

func( m *MessagingService) Send(){
	m.Repo.SendMessage()
}

func( m *MessagingService) Receive(){
	m.Repo.GetMessage()
}

func( m *MessagingService) Event(){
	m.Repo.Event()
}