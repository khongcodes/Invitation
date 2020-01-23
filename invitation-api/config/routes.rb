Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create, :show, :edit]
  post '/login', to: 'auth#create'
  resources :events, only: [:create, :show, :edit, :destroy]
end
