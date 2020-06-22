<template>
  <!------------------------------------------账户管理-------------------------------------------------------------->
  <div>
    <div class="typepage">
      <el-card class="box-card">
        <el-radio-group v-model="radiobutton" @change="Tabs" size="medium">
          <el-radio-button class="p13" label="1">我的账户</el-radio-button>
          <el-radio-button class="p13" label="2">账户列表</el-radio-button>
          <el-radio-button class="p13" label="3">新增子账户</el-radio-button>
        </el-radio-group>
      </el-card>

      <el-card v-if="criteria==1" class="flix box-card">
        <div class="content">
          <div>
            <span>用户名</span>
            <h5>{{sasslist.username}}</h5>
          </div>
          <div>
            <span>电话号码</span>
            <h5>
              {{sasslist.phone}}
              <i
                @click="outerVisible = true"
                style="color:#376099;"
                class="el-icon-edit"
              ></i>
            </h5>
          </div>
        </div>

        <div class="content">
          <div>
            <span>可创建小程序数量</span>
            <h5>{{sasslist.sumMiniProgram==-1?'永久':sasslist.sumMiniProgram}}</h5>
          </div>
          <div>
            <span>账号有效期</span>
            <h5>{{sasslist.valid}}</h5>
          </div>
        </div>

        <div class="content">
          <div>
            <span>可创建网站数量</span>
            <h5>{{sasslist.sumWeb==-1?'永久':sasslist.sumWeb}}</h5>
          </div>
          <div>
            <span>可创建uni-app数量</span>
            <h5>{{sasslist.sumUniApp==-1?'永久':sasslist.sumUniApp}}</h5>
          </div>
        </div>
      </el-card>
      <!-- ------------------------------------------弹窗修改手机号------------------------------------------------------------- -->
      <el-dialog title="修改手机号" :visible.sync="outerVisible" width="40%" center>
        <el-form :inline="true" label-width="100px" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="24">
              <el-form-item label="新手机号">
                <el-input v-model="formInline.authKey" placeholder="填写新的手机号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="验证码">
                <el-input v-model="formInline.passwd" placeholder="填写收到的验证码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="getcode" type="primary">获取验证码</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="Determine">确 定</el-button>
        </span>
      </el-dialog>
      <!-- ——————————————————————————————————————————————————————————————————————————————————————————————————————- -->
      <el-card v-if="criteria==2" class="box-card">
        <el-row class="f10" :gutter="10">
          <el-col :span="6">
            <el-input @keyup.enter.native="submit" placeholder="请输入用户名或手机号" prefix-icon="el-icon-search" v-model="formseek.NamePhone"></el-input>
          </el-col>
        <!--
          <el-col :span="4">
            <el-button size="small" type="primary">批量权限设置</el-button>
          </el-col> -->

          <el-col :span="5">
            <el-button @click="Sasscut(1)" size="small" type="primary">内部账户列表(200)</el-button>
          </el-col>

          <el-col :span="5">
            <el-button @click="Sasscut(2)" size="small" type="primary">代理账户列表(200)</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="username" label="账户"></el-table-column>
          <el-table-column prop="sumMiniProgram" label="可创建小程序数量"></el-table-column>
          <el-table-column prop="alreadyMiniProgram" label="已创建小程序数量"></el-table-column>
          <el-table-column prop="sumWeb" label="可创建网站数量"></el-table-column>
          <el-table-column prop="alreadyWeb" label="已创建网站数量"></el-table-column>
          <el-table-column prop="sumUniApp" label="可创建uni-app数量"></el-table-column>
          <el-table-column prop="valid" label="有效期"></el-table-column>
          <el-table-column prop="accountAttribute" label="属性"></el-table-column>
          <el-table-column  label="操作" width="150">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="centerDialogVisible = true" type="primary">编辑</el-button>
              <el-button size="mini" type="warning">修改</el-button> -->
              <el-button size="mini" @click="Delete(scope.row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card v-if="criteria==3" class="box-card">
        <div slot="header" class="clearfix">
          <span>新增子账户信息</span>
        </div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="360px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input size="small" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input size="small" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="accountCode">
            <el-input size="small" v-model="ruleForm.accountCode"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input size="small" v-model="ruleForm.remark"></el-input>
          </el-form-item>

          <el-form-item label="小程序数量" prop="sumMiniProgram">
            <el-input size="small" v-model="ruleForm.sumMiniProgram"></el-input>
            <el-switch v-model="ruleForm.delivery"  active-text="无限制"></el-switch>
          </el-form-item>

          <el-form-item label="网站数量" prop="sumWeb">
            <el-input size="small" v-model="ruleForm.sumWeb"></el-input>
            <el-switch v-model="ruleForm.delivery2" active-text="无限制"></el-switch>
          </el-form-item>

          <el-form-item label="uni-app数量" prop="sumUniApp">
            <el-input size="small" v-model="ruleForm.sumUniApp"></el-input>
            <el-switch v-model="ruleForm.delivery3" active-text="无限制"></el-switch>
          </el-form-item>

          <el-form-item label="账户有效期" prop="valid">
             <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.valid"
              type="datetime"
              placeholder="选择时间"
              align="right"
              default-time="12:00:00"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="账户属性" prop="accountAttribute">
            <el-radio-group v-model="ruleForm.accountAttribute">
              <el-radio label="1">内部员工</el-radio>
              <el-radio label="2">外部代理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- -----------------------------------------------弹窗---------------q9------------------------------------------ -->
    <el-dialog title="批量权限设置" :visible.sync="centerDialogVisible" width="50%" center>
      <el-tabs tab-position="left" style="height: 200px;">
        <el-tab-pane label="基础权限">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>

          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
            size="small"
          >
            <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
          </el-checkbox-group>
        </el-tab-pane>

        <el-tab-pane label="上传权限">
          <el-checkbox
            :indeterminate="isIndeterminate2"
            v-model="ListAll"
            @change="handleCheckAllChange2"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>

          <el-checkbox-group
            v-model="PowerListCities"
            @change="handleCheckedCitiesChange2"
            size="small"
          >
            <el-checkbox-button v-for="city in PowerList" :label="city" :key="city">{{city}}</el-checkbox-button>
          </el-checkbox-group>
        </el-tab-pane>

        <el-tab-pane label="模板权限">
          <div>
            <span>显示权限</span>
            <el-link class="m20" type="primary" @click="innerVisible = true">添加模板</el-link>
            <el-checkbox v-model="checked">全选</el-checkbox>
          </div>
          <div>
            <span>使用权限</span>
            <el-link class="m20" type="primary" @click="innerVisible = true">添加模板</el-link>
            <el-checkbox v-model="checked">全选</el-checkbox>
          </div>
          <!-- -----------内层弹窗--------------- -->
          <el-dialog width="40%" title="选择模板" :visible.sync="innerVisible" append-to-body center>
            <el-checkbox-group class="inner" v-model="checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              <el-checkbox label="复选框 D"></el-checkbox>
              <el-checkbox label="复选框 E"></el-checkbox>
              <el-checkbox label="复选框 F"></el-checkbox>
              <el-checkbox label="复选框 G"></el-checkbox>
              <el-checkbox label="复选框 H"></el-checkbox>
            </el-checkbox-group>

            <span slot="footer" class="dialog-footer">
              <el-button @click="innerVisible = false">取 消</el-button>
              <el-button type="primary" @click="innerVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <!-- -------------------------- -->
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import api from '@/service/managememt.js'
import log from '@/service/login.js'
const cityOptions = ['上海', '北京', '广州', '深圳']
const cityList = ['本地服务器', '阿里云OSS', '七牛云储存', '腾讯云OSS']
export default {
  name: '',
  data () {
    return {
      sasslist: [],
      outerVisible: false,
      // 修改手机号
      formInline: {
        passwd: '',
        accountId: '',
        authKey: ''
      },

      checkList: ['选中且禁用', '复选框 A'],
      checked: false, // 选择窗
      innerVisible: false, // 内层嵌套
      // -------------弹窗多选---------
      checkAll: false,
      ListAll: false,
      checkedCities: ['上海', '北京'],
      PowerListCities: ['本地服务器'],
      cities: cityOptions,
      PowerList: cityList,
      isIndeterminate: true,
      isIndeterminate2: true,

      // -----------------------------
      centerDialogVisible: false,
      radiobutton: '1',
      criteria: 1,
      ruleForm: {
        accountAttribute: '', // 账户属性
        remark: '', // 备注
        password: '', // 密码
        accountCode: '', // 手机号
        accountType: 'sass', // 类型
        alreadyMiniProgram: '', // 已经创建小程序数量
        alreadyUniApp: '', // 已经创建uni-app数量
        sumUniApp: '1', // 可创建uni-app数量
        sumMiniProgram: '1', // 可创建小程序数量
        alreadyWeb: '', // 已创建网站数量
        sumWeb: '1', // 可创建网站数量
        valid: '', // 账户有效期
        isPerpetual: '', // 是否是永久账号 永久-1
        lastModifier: '', // 账号id
        delivery: false,
        delivery2: false,
        delivery3: false
      },

      input2: '',
      formseek: {
        NamePhone: '', // 用户名或手机号
        accountAttribute: ''// 账号类型1内部员工 2代理
      },
      tableData: [],

      rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        valid: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        accountAttribute: [
          { required: true, message: '请选择账户属性', trigger: 'change' }
        ],

        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.SassMessage()
    this.SassList()
  },
  methods: {
    // 删除
    Delete (row) {
      console.log(row)
      const params = {
        isDeleted: '1',
        AccountId: row.id
      }
      api.deletedSass(params, (res) => {
        console.log('查询', res.data.data)
        this.tableData = res.data.data.list
      })
    },
    submit () {
      api.SassList({ NamePhone: this.formseek.NamePhone }, (res) => {
        console.log('查询', res.data.data)
        this.tableData = res.data.data.list
      })
    },
    Sasscut (e) {
      api.SassList({ accountAttribute: e }, (res) => {
        console.log('Sass内部 或 代理 账号列表', res.data.data)
        this.tableData = res.data.data.list
      })
    },
    // Sass账号列表
    SassList () {
      api.SassList({}, (res) => {
        console.log('Sass账号列表', res.data.data)
        this.tableData = res.data.data.list
      })
    },
    // 修改手机号
    Determine () {
      this.formInline.accountId = store.getUser().account
      api.updatePhone(this.formInline, (res) => {
        console.log(res)
        this.outerVisible = false
      })
    },
    // 获取验证码
    getcode () {
      console.log(this.formInline.authKey === /^1[3-9]\d{9}$/)
      const patrn = /^1[3-9]\d{9}$/
      if (patrn.exec(this.formInline.authKey)) {
        const params = {
          phone: this.formInline.authKey,
          type: 'login'
        }
        log.code(params, res => {
          console.log(res)
          this.formInline.passwd = res.data.data
        })
        // this.$router.push('/');
      } else {
        return false
      }
    },
    // 获取信息列表
    SassMessage () {
      const id = store.getUser().account
      api.SassMessage(id, (res) => {
        console.log('获取信息列表', res.data.data)
        this.sasslist = res.data.data
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.delivery)
          if (this.ruleForm.delivery) {
            this.ruleForm.sumMiniProgram = '-1'
          }
          if (this.ruleForm.delivery2) {
            this.ruleForm.sumWeb = '-1'
          }
          if (this.ruleForm.delivery3) {
            this.ruleForm.sumUniApp = '-1'
          }
          this.ruleForm.lastModifier = store.getUser().account
          api.AddSass(this.ruleForm, (res) => {
            console.log(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    Tabs (e) {
      this.criteria = e
    },
    // --------------基础权限全选的事件------------------
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    },

    handleCheckAllChange2 (val) {
      this.PowerListCities = val ? cityList : []
      this.isIndeterminate2 = false
    },
    handleCheckedCitiesChange2 (value) {
      const checkedCount = value.length
      this.ListAll = checkedCount === this.PowerList.length
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.PowerList.length
    }
    // --------------------------------------------
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
