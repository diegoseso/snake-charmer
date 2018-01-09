package webSocket


type Repo struct{}

func (r *Repo)SendMessage()error{
	return nil
}

func (r *Repo)GetMessage()string{
	return ""
}

func (r *Repo)Event()error{
	return nil
}