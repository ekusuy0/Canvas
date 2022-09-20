Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # 顧客用
  # URL /customers/sign_in ...
  devise_for :users, skip: [:passwords], controllers: {
    registrations: "public/registrations",
    sessions: "public/sessions"
  }

  devise_scope :user do
    post 'users/guest_sign_in', to: 'public/sessions#guest_sign_in'
  end

  # 管理者用
  # URL /admin/sign_in ...
  devise_for :admin, skip: [:registrations, :passwords], controllers: {
    sessions: "admin/sessions"
  }

  namespace :admin do
    get '/' => 'homes#top'
  end

  root to: 'public/homes#top'

  get 'users/my_page' => 'public/users#show'
  get 'users/information/edit' => 'public/users#edit'
  patch 'users/information' => 'public/users#update'
  get 'users/out_check' => 'public/users#out_check'
  patch 'users/out' => 'public/users#out'


  scope module: :public do
    resources :tags, only: [:create, :edit, :update, :destroy]
    resources :group_tags, only: [:create, :edit, :update, :destroy]
    resources :notifications, only: :index

    resources :group_tasks, except: [:show, :index]

    resources :tasks, except: [:index, :show]

    resources :groups, only: [:new, :create, :index, :show] do
      get '/confirm' => 'groups#confirm'
      get '/chat' => 'groups#chat'
      member do
        get :join
        post :invitation
      end
    end

    resources :messages, only: [:create]
  end


end
