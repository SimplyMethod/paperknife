class Post < ApplicationRecord
  has_rich_text :body

  belongs_to :project
end
