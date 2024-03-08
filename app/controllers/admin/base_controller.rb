class Admin::BaseController < ApplicationController
  before_action :require_admin
  set_current_tenant_through_filter
  before_action :set_current_account

  private

  def require_admin
    unless current_user&.admin?
        redirect_to root_path, alert: "You are not authorized to access this page"
    end
  end

  def set_current_account
    current_account = current_user.account
    set_current_account(current_account)
  end
end
