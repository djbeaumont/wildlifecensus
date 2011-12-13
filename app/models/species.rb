class Species < ActiveRecord::Base
  has_many :sightings
  
  def to_s
    @vernacular
  end

end
