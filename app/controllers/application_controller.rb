class ApplicationController < ActionController::Base
  set_current_tenant_by_subdomain_or_domain(:account, :subdomain, :domain)
  # before_action :authenticate_user!
  # set_current_tenant_through_filter
  # before_action :set_current_account

  # def set_current_account
  # return unless current_user.present?
  # current_account = current_user.account
  # ActsAsTenant.current_tenant = current_account
  # end


  layout :layout_by_resource

  private

  def layout_by_resource
    if devise_controller?
      "devise"
    else
      "application"
    end
  end
end
