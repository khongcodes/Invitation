class EventsController < ApplicationController
  def create
    @event = Event.create(event_params)
    if @event.valid?
      render json: {event: EventSerializer.new(@event)}, status: :created
    else
      render json: {errors: ['failed to create event']}, status: :not_accepted
    end
  end
  
  def show
    @event = Event.find(params[:id])
    # does current_user match this event's user_id
    # if not logged_in show false
    if @event
      # byebug
      # if @event.user == current_user
      render json: {event: EventSerializer.new(@event)}, status: :accepted
    else
      render json: {status: 500, errors: ['user not found']}
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :location, :time, :date, :user_id)
  end
end
