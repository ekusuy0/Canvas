require "test_helper"

class Public::GroupTasksControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get public_group_tasks_create_url
    assert_response :success
  end

  test "should get update" do
    get public_group_tasks_update_url
    assert_response :success
  end

  test "should get destroy" do
    get public_group_tasks_destroy_url
    assert_response :success
  end

  test "should get new" do
    get public_group_tasks_new_url
    assert_response :success
  end
end
