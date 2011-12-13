class SessionsController < ApplicationController

  def new
    
  end
  
  def create
    user = authenticate(params[:email], params[:password])
    if user
      session[:user_id] = user.id
      redirect_to root_url, :notice => "Logged in!"
    else
      flash.now.alert = "Invalid email or password"
      render "new"
    end
  end
  
  def destroy
    session[:user_id] = nil
    redirect_to root_url, :notice => "Logged out!"
  end

  def authenticate(email, password)
    user = User.find_by_email(email)
    hash = BCrypt::Engine.hash_secret(password, user.password_salt)
    
    if user && user.password_hash == hash
      user
    else
      nil
    end
  end

end
