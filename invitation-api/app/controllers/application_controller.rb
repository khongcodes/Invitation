class ApplicationController < ActionController::API
  # before_action :authorized

  def encode_token(payload)
    JWT.encode(payload, 'my_s3cr3t')
  end

  def auth_header
    # {'Authorization': 'Bearer <token>'}
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, 'my_s3cr3t', true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
      # decoded_token = [{"user_id" => 2}, {"alg" => "HS256"}]
      # or nil if decode fails
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!current_user
  end

  # move this to user controller? to prevent user from editing other user
  # prevent user from editing another user's event
  def authorized
    render json: {message: 'Please log in'}, status: :unauthorized unless logged_in?
  end

end
