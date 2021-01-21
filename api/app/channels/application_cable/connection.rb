module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :game_code

    def connect
      # FIXME: find a legit way to do this
      game_code = Game.last.code
      self.game_code = game_code or reject_unauthorized_connection
    end
  end
end
