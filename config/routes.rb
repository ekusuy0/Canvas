Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # 顧客用
  # URL /customers/sign_in ...
  devise_for :users, skip: [:passwords], controllers: {
    registrations: "public/registrations",
    sessions: "public/sessions"
  }

  # 管理者用
  # URL /admin/sign_in ...
  devise_for :admin, skip: [:registrations, :passwords], controllers: {
    sessions: "admin/sessions"
  }

  root to: 'public/homes#top'
  get 'about' => 'public/homes#about'

  get 'users/my_page' => 'public/users#show'
  get 'users/information/edit' => 'public/users#edit'
  patch 'users/information' => 'public/users#update'
  get 'users/out_check' => 'public/users#out_check'
  patch 'users/out' => 'public/users#out'
  get 'users/calendar_test' => 'public/users#calendar_test'

  scope module: :public do
    resources :tags, only: [:create, :edit, :update]

    resources :tasks, except: [:index, :edit, :show] do
      collection do
        get '/day_index' => 'tasks#day_index'
      end
    end

    resources :groups, only: [:new, :create, :index] do
      collection do
        get '/confirm' => 'groups#confirm'
        get '/chat' => 'groups#chat'
      end
    end

    resources :messages, only: [:create]
  end


end
