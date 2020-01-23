class Api::V1::EventsController < ApplicationController
  def create
    @event = Event.create(event_params)
    if @event.valid?
      render json: {event: EventSerializer.new(@event)}, status: :created
    else
      render json: {error: 'failed to create event'}, status: :not_accepted
    end
  end
  
  def show
    @event = Event.find(params[:id])
    render json: {event: EventSerializer.new(@event)}, status: :accepted
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :location, :time, :date :user_id)
  end
end
