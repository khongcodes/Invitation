class EventsController < ApplicationController
  before_action :set_event, except: :create

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
    if @event
      render json: {event: EventSerializer.new(@event), authorize: event_authorize}, status: :accepted
    end
  end

  # similar to show - but if authorize == false, do not return data
  def edit
    if event_authorize
      render json: {event: EventSerializer.new(@event), authorize: event_authorize}, status: :accepted
    elsif !event_authorize
      render json: {error: 'You do not have permission to edit this resource'}, status: :unauthorized
    end
  end

  def update
    # byebug
    @event.assign_attributes(event_params)
    if event_authorize && @event.save
      render json: {event: EventSerializer.new(@event), authorize: event_authorize}, status: :accepted
    else
      render json: {errors: ['failed to update event']}, status: :not_acceptable
    end
  end


  private

  def event_params
    params.require(:event).permit(:title, :description, :location, :time, :date, :user_id)
  end

  def set_event
    begin
      @event = Event.find(params[:id])
    rescue ActiveRecord::RecordNotFound => exception
      render json: {
        error: exception.to_s,
      }, status: :not_found
    end
    @event
  end

  def event_authorize
    @event.user && @event.user==current_user
  end
end
