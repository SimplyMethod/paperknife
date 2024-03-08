class Project < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  acts_as_tenant :account


  validates :name, presence: true

  has_many :posts, dependent: :destroy
end
