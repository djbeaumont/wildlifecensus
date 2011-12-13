Wildlifecensus::Application.routes.draw do
  resources :sightings
  resources :users
  resources :species
  resources :sessions
  
  get "login" => "sessions#new", :as => "login"
  get "logout" => "sessions#destroy", :as => "logout"
  get "register" => "users#new", :as => "register"

  root :to => "maps#index"
end
