class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :time
  has_one :user, optional: true
end
