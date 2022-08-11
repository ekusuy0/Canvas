require "test_helper"

class Public::GroupTagsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get public_group_tags_create_url
    assert_response :success
  end

  test "should get edit" do
    get public_group_tags_edit_url
    assert_response :success
  end

  test "should get update" do
    get public_group_tags_update_url
    assert_response :success
  end
end
