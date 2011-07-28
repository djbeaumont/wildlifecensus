class User < ActiveRecord::Base
  
  def to_s
    @email
  end
  
end
