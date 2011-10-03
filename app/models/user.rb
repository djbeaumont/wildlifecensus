class User < ActiveRecord::Base
  
  has_many :sightings
  
  attr_accessible :email, :password, :password_confirmation
  
  attr_accessor :password
  before_save :encrypt_password
  
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email
  validates_uniqueness_of :email
  
  def encrypt_password
    if password.present?
      self.salt = BCrypt::Engine.generate_salt
      self.hash = BCrypt::Engine.hash_secret(password, salt)
    end
  end
  
  def to_s
    @username
  end
  
end
