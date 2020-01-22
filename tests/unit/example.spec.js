import { shallowMount } from "@vue/test-utils";
import mainContent from "@/components/mainContent.vue";

describe("mainContent.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(mainContent, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
