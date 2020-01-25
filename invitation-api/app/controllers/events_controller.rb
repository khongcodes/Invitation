class EventsController < ApplicationController
  def create
    @event = Event.create(event_params)
    
    # AUTHORIZE controls edit/destroy access
    # in order to have access, the event must have been created by a registered user
    # and the current user must be that regular user
    
    if @event.valid?
      render json: {event: EventSerializer.new(@event), authorize: event_authorize}, status: :created
    else
      render json: {errors: ['failed to create event']}, status: :not_accepted
    end
  end
  
  def show
    @event = Event.find(params[:id])

    if @event
      render json: {event: EventSerializer.new(@event), authorize: event_authorize}, status: :accepted
    else
      render json: {status: 500, errors: ['user not found']}
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :location, :time, :date, :user_id)
  end

  def event_authorize
    @event.user && @event.user==current_user
  end
end
