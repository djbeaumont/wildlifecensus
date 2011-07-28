class Species < ActiveRecord::Base
  
  def to_s
    @vernacular
  end

end
