module ApplicationCable
  class GameChannel < Channel
    def subscribed
      stream_from "game_#{params[:game_code]}"
    end
  end
end
