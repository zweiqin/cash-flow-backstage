<template>
	<div class="info">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<!-- s搜索区 -->
				<div class="container">
					<el-form inline size="mini" :label-position="labelPosition" label-width="200px">

						<el-form-item label="状态：">
							<el-select
								v-model="infoForm.status"
								clearable
								placeholder="请选择"
							>
								<el-option label="禁用" value="0"></el-option>
								<el-option label="启用" value="1"></el-option>
							</el-select>
						</el-form-item>

						<el-button class="ResetSearch mr10" size="small" type="reset" @click="reset('infoForm')">重置</el-button>
						<el-button label="default" size="small" type="primary" @click="infoSearch">查询</el-button>
					</el-form>
				</div>
				<!-- e搜索区 -->
				<el-button label="default" size="small" type="primary" @click="addClick()">新增方法</el-button>
			</div>
			<!-- s表格 -->
			<el-table :data="tableData.data" style="width: 100%" size="small" highlight-current-row>

				<el-table-column prop="id" label="方法表主键id" min-width="100" />

				<el-table-column prop="method_name" label="方法名称" min-width="100" />

				<el-table-column prop="method" label="方法体" min-width="100" />

				<el-table-column prop="create_time" label="创建时间" min-width="100" />

				<el-table-column
					prop="status"
					label="状态"
					min-width="100"
				>
					<template slot-scope="scope">
						<el-tag
							:type="scope.row.status === 0 ? 'danger' : 'success'"
						>{{ scope.row.status === 0 ? '禁用' : '启用' }}</el-tag>
					</template>
				</el-table-column>

				<el-table-column label="操作" min-width="120" fixed="right" align="center">
					<template v-slot="scope">
						<!--						<el-button class="mr10" size="small" type="text" @click="changePwd(scope.row)">修改卡牌</el-button>-->
						<el-button
							class="mr10"
							size="small"
							type="text"
							@click="edit(scope.row)"
						>编辑方法
						</el-button>
						<el-button
							class="mr10"
							size="small"
							type="text"
							@click="del(scope.row)"
						>删除方法
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

		<!-- s新增方法 -->
		<el-dialog
			:close-on-click-modal="false"
			:visible.sync="add_visible"
			class="add_staff"
			title="新增方法"
			width="70%"
			top="5vh"
		>

			<el-form ref="addForm" :model="addForm" :rules="addRules" label-position="left" :label-width="formLabelWidth">

				<el-form-item label="方法名称：" prop="method_name">
					<el-input v-model="addForm.method_name" autocomplete="off" placeholder="请输入方法名称" />
				</el-form-item>

				<el-form-item label="方法体：" prop="method">
					<el-input v-model="addForm.method" autocomplete="off" placeholder="请输入方法体" />
				</el-form-item>

				<el-form-item label="状态：">
					<el-select
						v-model="addForm.status"
						clearable
						placeholder="请选择"
					>
						<el-option label="禁用" value="0"></el-option>
						<el-option label="启用" value="1"></el-option>
					</el-select>
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addSubmit('addForm')">添加方法</el-button>
			</div>
		</el-dialog>
		<!-- e新增方法 -->

		<!-- s编辑方法信息 -->
		<el-dialog
			:close-on-click-modal="false"
			:visible.sync="edit_visible"
			class="add_staff"
			title="编辑方法"
			width="70%"
			top="5vh"
		>

			<el-form ref="editForm" :model="editForm" :rules="editRules" label-position="left" :label-width="formLabelWidth">

				<el-form-item label="方法表主键id：" prop="role_name">
					<el-input v-model="editForm.id" autocomplete="off" disabled placeholder="请输入卡类型表主键id" />
				</el-form-item>

				<el-form-item label="方法名称：" prop="method_name">
					<el-input v-model="addForm.method_name" autocomplete="off" placeholder="请输入方法名称" />
				</el-form-item>

				<el-form-item label="方法体：" prop="method">
					<el-input v-model="addForm.method" autocomplete="off" placeholder="请输入方法体" />
				</el-form-item>

				<el-form-item label="状态：">
					<el-select
						v-model="addForm.status"
						clearable
						placeholder="请选择"
					>
						<el-option label="禁用" value="0"></el-option>
						<el-option label="启用" value="1"></el-option>
					</el-select>
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editSubmit('editForm')">保存修改</el-button>
			</div>
		</el-dialog>
		<!-- e编辑方法信息 -->

	</div>
</template>

<script>
import { GetMethodList, CreateMethod, DeleteMethod } from '@/api/admin'

export default {
	name: 'MethodManagement',
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
				limit: 10,
				status: ''
			},
			// 新增方法
			add_visible: false,
			addForm: {
				id: '', // 有id则修改，无id则新增
				method_name: '',
				method: '',
				status: ''
			},
			addRules: {
				// id: [ { required: true, message: '不能为空', change: 'blue' } ],
				method_name: [ { required: false, message: '不能为空', change: 'blue' } ],
				method: [ { required: false, message: '不能为空', change: 'blue' } ],
				status: [ { required: false, message: '不能为空', change: 'blue' } ]
			},
			// 编辑方法
			edit_visible: false,
			editForm: {
				id: '', // 有id则修改，无id则新增
				method_name: '',
				method: '',
				status: ''
			},
			editRules: {
				id: [ { required: true, message: '不能为空', change: 'blue' } ],
				method_name: [ { required: false, message: '不能为空', change: 'blue' } ],
				method: [ { required: false, message: '不能为空', change: 'blue' } ],
				status: [ { required: false, message: '不能为空', change: 'blue' } ]
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

		// 查询
		infoSearch() {
			this.getList(1)
		},

		// 列表
		getList(num) {
			this.infoForm.page = num || this.infoForm.page
			GetMethodList(this.infoForm)
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
		reset() {
			this.infoForm = {
				page: 1,
				limit: 10,
				status: ''
			}
			this.getList()
		},
		// 编辑
		edit(e) {
			this.editForm = {
				// 不用create_time
				id: String(e.id),
				method_name: e.method_name,
				method: e.method,
				status: String(e.status)
			}
			this.edit_visible = true
		},
		// 删除
		del(e) {
			this.$confirm('确定删除该方法?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				DeleteMethod({ id: e.id })
					.then(() => {
						this.$message.success('删除方法成功！')
						this.getList()
					})
			})
				.catch(() => {
				})
		},

		// 新增方法
		addSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				// 若必填项不为空
				if (valid) {
					CreateMethod(this.addForm)
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
					CreateMethod(this.editForm)
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
