class UserSerializer < ActiveModel::Serializer
  attributes :username, :img_url, :name, :bio, :id, :events
  def events
    self.object.events.map do |event|
      {
        title: event.title,
        id: event.id
      }
    end
  end
end
