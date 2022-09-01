<template>
	<div class="info">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<!-- s搜索区 -->
				<!-- e搜索区 -->
				<el-button label="default" size="small" type="primary" @click="addClick()">新增角色</el-button>
			</div>
			<!-- s表格 -->
			<el-table :data="tableData.data" style="width: 100%" size="small" highlight-current-row>

				<el-table-column prop="id" label="角色表主键id" min-width="100" />

				<el-table-column prop="role_name" label="沙盘角色名称" min-width="100" />

				<el-table-column prop="in_salary" label="本人基础工资（收入）" min-width="100" />

				<el-table-column prop="out_personal" label="个人支出（支出)" min-width="100" />

				<el-table-column prop="out_child" label="孩子基础支出（支出)" min-width="100" />

				<el-table-column prop="out_partner" label="配偶基础支出（支出)" min-width="100" />

				<el-table-column prop="out_tax" label="个人基础税金（支出)" min-width="100" />

				<el-table-column prop="out_self_housing" label="自住基础房贷款支出（支出)" min-width="100" />

				<el-table-column prop="out_rent" label="基础房租支出（支出)" min-width="100" />

				<el-table-column prop="out_car_loan" label="基础购车贷款支出（支出)" min-width="100" />

				<el-table-column prop="out_credit_card" label="基础信用卡支出（支出)" min-width="100" />

				<el-table-column prop="out_additional_liabilities" label="基础额外负债支出（支出)" min-width="100" />

				<el-table-column prop="debt_self_housing" label="自住房基础抵押贷款(负债)" min-width="100" />

				<el-table-column prop="debt_car_loan" label="基础购车贷款(负债)" min-width="100" />

				<el-table-column prop="debt_credit_card" label="基础信用卡负债(负债)" min-width="100" />

				<el-table-column prop="debt_additional_liabilities" label="基础额外负债(负债)" min-width="100" />

				<el-table-column prop="deposit" label="基础银行存款" min-width="100" />

				<el-table-column prop="energy" label="基础精力" min-width="100" />

				<el-table-column prop="in_total" label="基础总收入" min-width="100" />

				<el-table-column prop="out_total" label="基础总支出" min-width="100" />

				<el-table-column prop="cash_flow" label="基础月现金流" min-width="100" />

				<el-table-column label="操作" min-width="120" fixed="right" align="center">
					<template v-slot="scope">
						<!--						<el-button class="mr10" size="small" type="text" @click="changePwd(scope.row)">修改卡牌</el-button>-->
						<el-button
							class="mr10"
							size="small"
							type="text"
							@click="edit(scope.row)"
						>编辑角色
						</el-button>
						<el-button
							class="mr10"
							size="small"
							type="text"
							@click="del(scope.row)"
						>删除角色
						</el-button>
						<!--						 <el-button v-if="!is_del" type="text" size="small" class="mr10" @click="edit_state(scope.row)">编辑员工状态</el-button> -->
						<!--						<el-button v-if="is_del" type="text" size="small" class="mr10" @click="recover(scope.row)">恢复</el-button>-->
					</template>
				</el-table-column>
			</el-table>

			<div class="block">
				<el-pagination
					:page-sizes="[10, 20, 40, 60, 80]"
					:page-size="infoForm.limit"
					:current-page="infoForm.page"
					layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.total"
					@size-change="handle_size_change"
					@current-change="page_change"
				/>
			</div>
			<!-- e表格 -->

		</el-card>

		<!-- s新增角色 -->
		<el-dialog
			:close-on-click-modal="false"
			:visible.sync="add_visible"
			class="add_staff"
			title="新增角色"
			width="70%"
			top="5vh"
		>

			<el-form ref="addForm" :model="addForm" :rules="addRules" label-position="left" :label-width="formLabelWidth">

				<el-form-item label="沙盘角色名称：" prop="role_name">
					<el-input v-model="addForm.role_name" autocomplete="off" placeholder="请输入沙盘角色名称" />
				</el-form-item>

				<el-form-item label="本人基础工资（收入）：" prop="in_salary">
					<el-input v-model="addForm.in_salary" autocomplete="off" placeholder="（数值）请输入本人基础工资" />
				</el-form-item>

				<el-form-item label="个人支出（支出)：" prop="out_personal">
					<el-input v-model="addForm.out_personal" autocomplete="off" placeholder="（数值）请输入个人支出" />
				</el-form-item>

				<el-form-item label="孩子基础支出（支出)：" prop="out_child">
					<el-input v-model="addForm.out_child" autocomplete="off" placeholder="（数值）请输入孩子基础支出" />
				</el-form-item>

				<el-form-item label="个人基础税金（支出)：" prop="out_tax">
					<el-input v-model="addForm.out_tax" autocomplete="off" placeholder="（数值）请输入个人基础税金" />
				</el-form-item>

				<el-form-item label="自住基础房贷款支出（支出)：" prop="out_self_housing">
					<el-input v-model="addForm.out_self_housing" autocomplete="off" placeholder="（数值）请输入自住基础房贷款支出" />
				</el-form-item>

				<el-form-item label="基础房租支出（支出)：" prop="out_rent">
					<el-input v-model="addForm.out_rent" autocomplete="off" placeholder="（数值）请输入基础房租支出" />
				</el-form-item>

				<el-form-item label="基础购车贷款支出（支出)：" prop="out_car_loan">
					<el-input v-model="addForm.out_car_loan" autocomplete="off" placeholder="（数值）请输入基础购车贷款支出" />
				</el-form-item>

				<el-form-item label="基础信用卡支出（支出)：" prop="out_credit_card">
					<el-input v-model="addForm.out_credit_card" autocomplete="off" placeholder="（数值）请输入基础信用卡支出" />
				</el-form-item>

				<el-form-item label="基础额外负债支出（支出)：" prop="out_additional_liabilities">
					<el-input v-model="addForm.out_additional_liabilities" autocomplete="off" placeholder="（数值）请输入基础额外负债支出" />
				</el-form-item>

				<el-form-item label="自住房基础抵押贷款(负债)：" prop="debt_self_housing">
					<el-input v-model="addForm.debt_self_housing" autocomplete="off" placeholder="（数值）请输入自住房基础抵押贷款" />
				</el-form-item>

				<el-form-item label="基础购车贷款(负债)：" prop="debt_car_loan">
					<el-input v-model="addForm.debt_car_loan" autocomplete="off" placeholder="（数值）请输入基础购车贷款" />
				</el-form-item>

				<el-form-item label="基础信用卡负债(负债)：" prop="debt_credit_card">
					<el-input v-model="addForm.debt_credit_card" autocomplete="off" placeholder="（数值）请输入基础信用卡负债" />
				</el-form-item>

				<el-form-item label="基础额外负债(负债)：" prop="debt_additional_liabilities">
					<el-input v-model="addForm.debt_additional_liabilities" autocomplete="off" placeholder="（数值）请输入基础额外负债" />
				</el-form-item>

				<el-form-item label="基础银行存款：" prop="deposit">
					<el-input v-model="addForm.deposit" autocomplete="off" placeholder="（数值）请输入基础银行存款" />
				</el-form-item>

				<el-form-item label="基础精力：" prop="energy">
					<el-input v-model="addForm.energy" autocomplete="off" placeholder="（数值）请输入基础精力" />
				</el-form-item>

				<el-form-item label="基础总收入：" prop="in_total">
					<el-input v-model="addForm.in_total" autocomplete="off" placeholder="（数值）请输入基础总收入" />
				</el-form-item>

				<el-form-item label="基础总支出：" prop="out_total">
					<el-input v-model="addForm.out_total" autocomplete="off" placeholder="（数值）请输入基础总支出" />
				</el-form-item>

				<el-form-item label="基础月现金流：" prop="cash_flow">
					<el-input v-model="addForm.cash_flow" autocomplete="off" placeholder="（数值）请输入基础月现金流" />
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addSubmit('addForm')">添加角色</el-button>
			</div>
		</el-dialog>
		<!-- e新增角色 -->

		<!-- s编辑角色信息 -->
		<el-dialog
			:close-on-click-modal="false"
			:visible.sync="edit_visible"
			class="add_staff"
			title="编辑角色"
			width="70%"
			top="5vh"
		>

			<el-form ref="editForm" :model="editForm" :rules="editRules" label-position="left" :label-width="formLabelWidth">

				<el-form-item label="角色表主键id：" prop="id">
					<el-input v-model="editForm.id" autocomplete="off" disabled placeholder="（数值）请输入角色表主键id" />
				</el-form-item>

				<el-form-item label="沙盘角色名称：" prop="role_name">
					<el-input v-model="editForm.role_name" autocomplete="off" placeholder="请输入沙盘角色名称" />
				</el-form-item>

				<el-form-item label="本人基础工资（收入）：" prop="in_salary">
					<el-input v-model="editForm.in_salary" autocomplete="off" placeholder="（数值）请输入本人基础工资" />
				</el-form-item>

				<el-form-item label="个人支出（支出)：" prop="out_personal">
					<el-input v-model="editForm.out_personal" autocomplete="off" placeholder="（数值）请输入个人支出" />
				</el-form-item>

				<el-form-item label="孩子基础支出（支出)：" prop="out_child">
					<el-input v-model="editForm.out_child" autocomplete="off" placeholder="（数值）请输入孩子基础支出" />
				</el-form-item>

				<el-form-item label="个人基础税金（支出)：" prop="out_tax">
					<el-input v-model="editForm.out_tax" autocomplete="off" placeholder="（数值）请输入个人基础税金" />
				</el-form-item>

				<el-form-item label="自住基础房贷款支出（支出)：" prop="out_self_housing">
					<el-input v-model="editForm.out_self_housing" autocomplete="off" placeholder="（数值）请输入自住基础房贷款支出" />
				</el-form-item>

				<el-form-item label="基础房租支出（支出)：" prop="out_rent">
					<el-input v-model="editForm.out_rent" autocomplete="off" placeholder="（数值）请输入基础房租支出" />
				</el-form-item>

				<el-form-item label="基础购车贷款支出（支出)：" prop="out_car_loan">
					<el-input v-model="editForm.out_car_loan" autocomplete="off" placeholder="（数值）请输入基础购车贷款支出" />
				</el-form-item>

				<el-form-item label="基础信用卡支出（支出)：" prop="out_credit_card">
					<el-input v-model="editForm.out_credit_card" autocomplete="off" placeholder="（数值）请输入基础信用卡支出" />
				</el-form-item>

				<el-form-item label="基础额外负债支出（支出)：" prop="out_additional_liabilities">
					<el-input v-model="editForm.out_additional_liabilities" autocomplete="off" placeholder="（数值）请输入基础额外负债支出" />
				</el-form-item>

				<el-form-item label="自住房基础抵押贷款(负债)：" prop="debt_self_housing">
					<el-input v-model="editForm.debt_self_housing" autocomplete="off" placeholder="（数值）请输入自住房基础抵押贷款" />
				</el-form-item>

				<el-form-item label="基础购车贷款(负债)：" prop="debt_car_loan">
					<el-input v-model="editForm.debt_car_loan" autocomplete="off" placeholder="（数值）请输入基础购车贷款" />
				</el-form-item>

				<el-form-item label="基础信用卡负债(负债)：" prop="debt_credit_card">
					<el-input v-model="editForm.debt_credit_card" autocomplete="off" placeholder="（数值）请输入基础信用卡负债" />
				</el-form-item>

				<el-form-item label="基础额外负债(负债)：" prop="debt_additional_liabilities">
					<el-input v-model="editForm.debt_additional_liabilities" autocomplete="off" placeholder="（数值）请输入基础额外负债" />
				</el-form-item>

				<el-form-item label="基础银行存款：" prop="deposit">
					<el-input v-model="editForm.deposit" autocomplete="off" placeholder="（数值）请输入基础银行存款" />
				</el-form-item>

				<el-form-item label="基础精力：" prop="energy">
					<el-input v-model="editForm.energy" autocomplete="off" placeholder="（数值）请输入基础精力" />
				</el-form-item>

				<el-form-item label="基础总收入：" prop="in_total">
					<el-input v-model="editForm.in_total" autocomplete="off" placeholder="（数值）请输入基础总收入" />
				</el-form-item>

				<el-form-item label="基础总支出：" prop="out_total">
					<el-input v-model="editForm.out_total" autocomplete="off" placeholder="（数值）请输入基础总支出" />
				</el-form-item>

				<el-form-item label="基础月现金流：" prop="cash_flow">
					<el-input v-model="editForm.cash_flow" autocomplete="off" placeholder="（数值）请输入基础月现金流" />
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editSubmit('editForm')">保存修改</el-button>
			</div>
		</el-dialog>
		<!-- e编辑角色信息 -->

	</div>
</template>

<script>
import { GetRoleList, OperateRole, DeleteRole } from '@/api/admin'

export default {
	name: 'RoleManagement',
	data() {
		return {
			formLabelWidth: '350px',
			tableData: {
				data: [],
				total: 0
			},
			labelPosition: 'right',
			infoForm: {
				page: 1,
				limit: 10
			},
			// 新增角色
			add_visible: false,
			addForm: {
				id: '', // 有id则修改，无id则新增
				role_name: '',
				in_salary: '',
				out_personal: '',
				out_child: '',
				out_tax: '',
				out_self_housing: '',
				out_rent: '',
				out_car_loan: '',
				out_credit_card: '',
				out_additional_liabilities: '',
				debt_self_housing: '',
				debt_car_loan: '',
				debt_credit_card: '',
				debt_additional_liabilities: '',
				deposit: '',
				energy: '',
				in_total: '',
				out_total: '',
				cash_flow: ''
			},
			addRules: {
				// id: [ { required: true, message: '不能为空', change: 'blue' } ],
				role_name: [ { required: false, message: '不能为空', change: 'blue' } ],
				in_salary: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_personal: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_child: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_tax: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_self_housing: [ { required: false, change: 'blue' } ],
				out_rent: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_car_loan: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_credit_card: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_additional_liabilities: [ { required: false, message: '不能为空', change: 'blue' } ],
				debt_self_housing: [ { required: false, message: '不能为空', change: 'blue' } ],
				debt_car_loan: [ { required: false, message: '不能为空', change: 'blue' } ],
				debt_credit_card: [ { required: false, message: '不能为空', change: 'blue' } ],
				debt_additional_liabilities: [ { required: false, message: '不能为空', change: 'blue' } ],
				deposit: [ { required: false, message: '不能为空', change: 'blue' } ],
				energy: [ { required: false, message: '不能为空', change: 'blue' } ],
				in_total: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_total: [ { required: false, message: '不能为空', change: 'blue' } ],
				cash_flow: [ { required: false, message: '不能为空', change: 'blue' } ]
			},
			// 编辑角色
			edit_visible: false,
			editForm: {
				id: '', // 有id则修改，无id则新增
				role_name: '',
				in_salary: '',
				out_personal: '',
				out_child: '',
				out_tax: '',
				out_self_housing: '',
				out_rent: '',
				out_car_loan: '',
				out_credit_card: '',
				out_additional_liabilities: '',
				debt_self_housing: '',
				debt_car_loan: '',
				debt_credit_card: '',
				debt_additional_liabilities: '',
				deposit: '',
				energy: '',
				in_total: '',
				out_total: '',
				cash_flow: ''
			},
			editRules: {
				id: [ { required: true, message: '不能为空', change: 'blue' } ],
				role_name: [ { required: false, message: '不能为空', change: 'blue' } ],
				in_salary: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_personal: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_child: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_tax: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_self_housing: [ { required: false, change: 'blue' } ],
				out_rent: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_car_loan: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_credit_card: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_additional_liabilities: [ { required: false, message: '不能为空', change: 'blue' } ],
				debt_self_housing: [ { required: false, message: '不能为空', change: 'blue' } ],
				debt_car_loan: [ { required: false, message: '不能为空', change: 'blue' } ],
				debt_credit_card: [ { required: false, message: '不能为空', change: 'blue' } ],
				debt_additional_liabilities: [ { required: false, message: '不能为空', change: 'blue' } ],
				deposit: [ { required: false, message: '不能为空', change: 'blue' } ],
				energy: [ { required: false, message: '不能为空', change: 'blue' } ],
				in_total: [ { required: false, message: '不能为空', change: 'blue' } ],
				out_total: [ { required: false, message: '不能为空', change: 'blue' } ],
				cash_flow: [ { required: false, message: '不能为空', change: 'blue' } ]
			}
		}
	},
	mounted() {
		this.getList()
	},
	methods: {
		// 打开新增页面
		addClick() {
			this.add_visible = true
			this.$nextTick(() => {
				// console.log(this.$refs.addForm)
				this.$refs.addForm.resetFields()
			})
		},

		// 检测帐号
		// checkAccount(data) {
		// 	const reg_phone = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
		// 	if (!reg_phone.test(data)) {
		// 		this.$message.error('帐号必须为手机号码')
		// 		this.addForm.account = ''
		// 	}
		// },

		// 列表
		getList(num) {
			this.infoForm.page = num || this.infoForm.page
			GetRoleList(this.infoForm)
				.then((res) => {
					console.log(res)
					this.tableData.data = res.data.items
					this.tableData.total = res.data.total
				})
				.catch(() => {
				})
		},
		// 分页
		page_change(page) {
			this.infoForm.page = page
			this.getList()
		},
		handle_size_change(val) {
			this.infoForm.limit = val
			this.getList()
		},
		// 重置
		// reset() {
		// 	this.infoForm = {
		// 		page: 1,
		// 		limit: 10
		// 	}
		// 	this.getList()
		// },
		// 编辑
		edit(e) {
			this.editForm = {
				// 不用out_partner
				id: String(e.id),
				role_name: e.role_name,
				in_salary: String(e.in_salary),
				out_personal: String(e.out_personal),
				out_child: String(e.out_child),
				out_tax: String(e.out_tax),
				out_self_housing: String(e.out_self_housing),
				out_rent: String(e.out_rent),
				out_car_loan: String(e.out_car_loan),
				out_credit_card: String(e.out_credit_card),
				out_additional_liabilities: String(e.out_additional_liabilities),
				debt_self_housing: String(e.debt_self_housing),
				debt_car_loan: String(e.debt_car_loan),
				debt_credit_card: String(e.debt_credit_card),
				debt_additional_liabilities: String(e.debt_additional_liabilities),
				deposit: String(e.deposit),
				energy: String(e.energy),
				in_total: String(e.in_total),
				out_total: String(e.out_total),
				cash_flow: String(e.cash_flow)
			}
			this.edit_visible = true
		},
		// 删除
		del(e) {
			this.$confirm('确定删除该角色?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				DeleteRole({ id: e.id })
					.then(() => {
						this.$message.success('删除角色成功！')
						this.getList()
					})
			})
				.catch(() => {
				})
		},

		// 新增角色
		addSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				// 若必填项不为空
				if (valid) {
					OperateRole(this.addForm)
						.then(() => {
							this.$message.success('新增成功！')
							this.add_visible = false
							this.getList()
						})
						.catch((err) => {
							this.$message.error(err.data.data)
						})
				} else {
					return false
				}
			})
		},
		// e新增员工

		// 保存编辑修改
		editSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				// 若必填项不为空
				if (valid) {
					OperateRole(this.editForm)
						.then(() => {
							this.$message.success('修改成功！')
							this.edit_visible = false
							this.getList()
						})
						.catch((err) => {
							this.$message.error(err.data.data)
						})
				} else {
					return false
				}
			})
		}

	}
}
</script>

<style lang='scss'>
.info {
  .box-card {
    margin: 20px 20px
  }

  .container {
    min-width: 821px;
  }

  .block {
    float: right;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .add_staff {
    .el-form-item {
      margin-bottom: 20px;
    }

    ::v-deep .el-input__inner {
      text-align: left;
    }
  }

  .el-input__inner {
    text-align: left;
  }

  .end_input {
    display: block;
    position: absolute;
    top: 1px;
    left: 140px;
    width: 40px;
    height: 38px;
    line-height: 38px;
    border-radius: 0 8px 8px 0;
    font-size: 14px;
    color: #111111;
    text-align: center;
    background: rgba(0, 0, 0, 0.02);
  }

  .addBtn {
    margin-top: 10px;
  }
}

</style>
