import Vue from 'vue'
//layout
import NavMenu from './NavMenu.vue'
import SideBar from './SideBar.vue'
import WorkSpace from './WorkSpace.vue'
import AppFooter from './AppFooter.vue'
//ivews
import clickoutside from 'iview/src/directives/clickoutside'
import 'iview/dist/styles/iview.css'
import {
    Alert,
    AutoComplete,
    Avatar,
    Badge,
    Button,
    Card,
    Carousel,
    Cascader,
    Checkbox,
    Collapse,
    ColorPicker,
    DatePicker,
    Dropdown,
    Form,
    Icon,
    Input,
    InputNumber,
    Menu,
    Message,
    Modal,
    Notice,
    Page,
    Poptip,
    Progress,
    Radio,
    Rate,
    Slider,
    Spin,
    Steps,
    Table,
    Tabs,
    Tag,
    Timeline,
    TimePicker,
    Tooltip,
    Transfer,
    Tree,
    Upload
  } from 'iview'

import { Row, Col } from 'iview/src/components/grid'
import { Select, Option, OptionGroup } from 'iview/src/components/select'

const components = {
    Alert,
    AutoComplete,
    Avatar,
    Badge,
    Button,
    ButtonGroup: Button.Group,
    Card,
    Carousel,
    CarouselItem: Carousel.Item,
    Cascader,
    Checkbox,
    CheckboxGroup: Checkbox.Group,
    Col,
    Collapse,
    ColorPicker,
    DatePicker,
    Dropdown,
    DropdownItem: Dropdown.Item,
    DropdownMenu: Dropdown.Menu,
    Form,
    FormItem: Form.Item,
    Icon,
    Input,
    InputNumber,
    Menu,
    MenuGroup: Menu.Group,
    MenuItem: Menu.Item,
    Submenu: Menu.Sub,
    Message,
    Modal,
    Notice,
    Option,
    OptionGroup,
    Page,
    Panel: Collapse.Panel,
    Poptip,
    Progress,
    Radio,
    RadioGroup: Radio.Group,
    Rate,
    Row,
    Select,
    Slider,
    Spin,
    Step: Steps.Step,
    Steps,
    Table,
    Tabs,
    TabPane: Tabs.Pane,
    Tag,
    Timeline,
    TimelineItem: Timeline.Item,
    TimePicker,
    Tooltip,
    Transfer,
    Tree,
    Upload
  }

Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice
Vue.prototype.$Spin = Spin

// 注册全局组件
Vue.component('NavMenu', NavMenu)
Vue.component('SideBar', SideBar)
Vue.component('WorkSpace', WorkSpace)
Vue.component('AppFooter', AppFooter)
Vue.directive('clickoutside',clickoutside)