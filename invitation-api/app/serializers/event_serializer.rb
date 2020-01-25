class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :time, :user
  def user
    if self.object.user
      {
        id: self.object.user.id,
        name: self.object.user.name
      }
    end
  end
end
