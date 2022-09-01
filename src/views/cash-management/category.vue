<template>
	<div class="info">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<!-- s搜索区 -->
				<!-- e搜索区 -->
				<el-button label="default" size="small" type="primary" @click="addClick()">新增分类</el-button>
			</div>
			<!-- s表格 -->
			<el-table :data="tableData.data" style="width: 100%" size="small" highlight-current-row>

				<el-table-column prop="id" label="卡类型表主键id" min-width="100" />

				<el-table-column prop="category_name" label="卡类型名称" min-width="100" />

				<el-table-column prop="price" label="开卡时需要支付的金额" min-width="100" />

				<el-table-column prop="create_time" label="创建时间" min-width="100" />

				<el-table-column label="操作" min-width="120" fixed="right" align="center">
					<template v-slot="scope">
						<!--						<el-button class="mr10" size="small" type="text" @click="changePwd(scope.row)">修改卡牌</el-button>-->
						<el-button
							class="mr10"
							size="small"
							type="text"
							@click="edit(scope.row)"
						>编辑分类
						</el-button>
						<el-button
							class="mr10"
							size="small"
							type="text"
							@click="del(scope.row)"
						>删除分类
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

		<!-- s新增分类 -->
		<el-dialog
			:close-on-click-modal="false"
			:visible.sync="add_visible"
			class="add_staff"
			title="新增分类"
			width="70%"
			top="5vh"
		>

			<el-form ref="addForm" :model="addForm" :rules="addRules" label-position="left" :label-width="formLabelWidth">

				<el-form-item label="卡类型名称：" prop="in_salary">
					<el-input v-model="addForm.category_name" autocomplete="off" placeholder="请输入卡类型名称" />
				</el-form-item>

				<el-form-item label="开卡时需要支付的金额：" prop="out_personal">
					<el-input v-model="addForm.price" autocomplete="off" placeholder="（数值）请输入开卡时需要支付的金额" />
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addSubmit('addForm')">添加分类</el-button>
			</div>
		</el-dialog>
		<!-- e新增分类 -->

		<!-- s编辑分类信息 -->
		<el-dialog
			:close-on-click-modal="false"
			:visible.sync="edit_visible"
			class="add_staff"
			title="编辑分类"
			width="70%"
			top="5vh"
		>

			<el-form ref="editForm" :model="editForm" :rules="editRules" label-position="left" :label-width="formLabelWidth">

				<el-form-item label="卡类型表主键id：" prop="role_name">
					<el-input v-model="editForm.id" autocomplete="off" disabled placeholder="请输入卡类型表主键id" />
				</el-form-item>

				<el-form-item label="卡类型名称：" prop="in_salary">
					<el-input v-model="editForm.category_name" autocomplete="off" placeholder="请输入卡类型名称" />
				</el-form-item>

				<el-form-item label="开卡时需要支付的金额：" prop="out_personal">
					<el-input v-model="editForm.price" autocomplete="off" placeholder="（数值）请输入开卡时需要支付的金额" />
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editSubmit('editForm')">保存修改</el-button>
			</div>
		</el-dialog>
		<!-- e编辑分类信息 -->

	</div>
</template>

<script>
import { GetCategoryList, CreateCategory, DeleteCategory } from '@/api/admin'

export default {
	name: 'CategoryManagement',
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
			// 新增分类
			add_visible: false,
			addForm: {
				id: '', // 有id则修改，无id则新增
				category_name: '',
				price: ''
			},
			addRules: {
				// id: [ { required: true, message: '不能为空', change: 'blue' } ],
				category_name: [ { required: false, message: '不能为空', change: 'blue' } ],
				price: [ { required: false, message: '不能为空', change: 'blue' } ]
			},
			// 编辑分类
			edit_visible: false,
			editForm: {
				id: '', // 有id则修改，无id则新增
				category_name: '',
				price: ''
			},
			editRules: {
				id: [ { required: true, message: '不能为空', change: 'blue' } ],
				category_name: [ { required: false, message: '不能为空', change: 'blue' } ],
				price: [ { required: false, message: '不能为空', change: 'blue' } ]
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
			GetCategoryList(this.infoForm)
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
				// 不用create_time
				id: String(e.id),
				category_name: e.category_name,
				price: String(e.price)
			}
			this.edit_visible = true
		},
		// 删除
		del(e) {
			this.$confirm('确定删除该分类?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				DeleteCategory({ id: e.id })
					.then(() => {
						this.$message.success('删除分类成功！')
						this.getList()
					})
			})
				.catch(() => {
				})
		},

		// 新增分类
		addSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				// 若必填项不为空
				if (valid) {
					CreateCategory(this.addForm)
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
					CreateCategory(this.editForm)
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
