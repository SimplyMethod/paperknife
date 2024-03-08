class CreateAccounts < ActiveRecord::Migration[7.1]
  def change
    create_table :accounts, id: :uuid do |t|
      t.string :domain, index: { unique: true }
      t.string :subdomain, index: { unique: true }
      t.references :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
