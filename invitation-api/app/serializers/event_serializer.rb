class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :time, :date, :user
  def user
    if self.object.user
      {
        id: self.object.user.id,
        name: self.object.user.name
      }
    end
  end
end
