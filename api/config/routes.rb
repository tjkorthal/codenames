Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'game/create', to: 'game#create'
  get 'game/:code', to: 'game#load'
  post 'game/guess', to: 'game#guess'
  post 'game/end_turn', to: 'game#end_turn'
end
