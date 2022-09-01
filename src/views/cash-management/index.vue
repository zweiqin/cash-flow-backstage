<template>
	<div class="info">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<!-- s搜索区 -->
				<div class="container">
					<el-form inline size="mini" :label-position="labelPosition" label-width="200px">

						<el-form-item label="关联卡类别主键id：" style="display:inline-block">
							<el-input v-model="infoForm.category_id" clearable placeholder="请输入关联卡类别主键id" />
						</el-form-item>

						<el-form-item label="卡类型：">
							<el-select
								v-model="infoForm.type"
								clearable
								placeholder="请选择"
							>
								<el-option label="装备" value="0"></el-option>
								<el-option label="辅助" value="1"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="是否触发所有玩家：">
							<el-select
								v-model="infoForm.is_all"
								clearable
								placeholder="请选择"
							>
								<el-option label="针对单玩家" value="0"></el-option>
								<el-option label="针对所有玩家" value="1"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="是否需要banker跟进处理：">
							<el-select
								v-model="infoForm.is_banker_follow"
								clearable
								placeholder="请选择"
							>
								<el-option label="不需要" value="0"></el-option>
								<el-option label="需要" value="1"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="抽到卡时是否需要填写：">
							<el-select
								v-model="infoForm.is_need_fill"
								clearable
								placeholder="请选择"
							>
								<el-option label="不需要" value="0"></el-option>
								<el-option label="需要" value="1"></el-option>
							</el-select>
						</el-form-item>

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

						<el-form-item label="卡的类别：">
							<el-select
								v-model="infoForm.class"
								clearable
								placeholder="请选择"
							>
								<el-option label="无类别" value="0"></el-option>
								<el-option label="房产" value="1"></el-option>
								<el-option label="股票" value="2"></el-option>
								<el-option label="企业投资" value="3"></el-option>
								<el-option label="觉察投资" value="4"></el-option>
							</el-select>
						</el-form-item>

						<el-button class="ResetSearch mr10" size="small" type="reset" @click="reset('infoForm')">重置</el-button>
						<el-button label="default" size="small" type="primary" @click="infoSearch">查询</el-button>
					</el-form>
				</div>
				<!-- e搜索区 -->
				<el-button label="default" size="small" type="primary" @click="addClick()">新增游戏卡</el-button>
			</div>

			<!-- s表格 -->
			<el-table :data="tableData.data" style="width: 100%" size="small" highlight-current-row>

				<el-table-column prop="id" label="卡表主键id" min-width="100" />

				<el-table-column prop="category_id" label="关联卡类别主键id" min-width="100" />

				<el-table-column prop="card_name" label="卡名称" min-width="100" />

				<el-table-column prop="type" label="卡类型" min-width="100" />

				<el-table-column prop="is_all" label="是否触发所有玩家" min-width="100" />

				<el-table-column prop="energy" label="所需精力" min-width="100" />

				<el-table-column prop="in" label="收入属性(指该卡对收入带来的值，通常为被动收入)" min-width="100" />

				<el-table-column prop="out" label="支出(通常为每月净现金流的贷款)" min-width="100" />

				<el-table-column prop="assets_num" label="资产数(股票为持股数,房产为首付)" min-width="100" />

				<el-table-column prop="assets_value" label="资产价值(股票时为股价,房产时为房产总价)" min-width="100" />

				<el-table-column prop="liabilities" label="负债(通常为银行指明的贷款数)" min-width="100" />

				<el-table-column prop="is_banker_follow" label="是否需要banker跟进处理" min-width="100" />

				<el-table-column prop="method" label="方法(后端接口参照此方法名称来定位调用方法处理)" min-width="100" />

				<el-table-column prop="relation_card" label="关联的要触发的卡id(以','号隔开或键值对的json)" min-width="100" />

				<el-table-column prop="is_need_fill" label="抽到卡时是否需要填写" min-width="100" />

				<el-table-column prop="create_time" label="创建时间" min-width="100" />

				<el-table-column prop="status" label="状态" min-width="100" />

				<el-table-column prop="class" label="卡的类别" min-width="100" />

				<el-table-column prop="describe" label="卡片描述" min-width="100" />

				<el-table-column label="操作" min-width="120" fixed="right" align="center">
					<template v-slot="scope">
						<!--						<el-button class="mr10" size="small" type="text" @click="changePwd(scope.row)">修改卡牌</el-button>-->
						<el-button
							class="mr10"
							size="small"
							type="text"
							@click="edit(scope.row)"
						>编辑卡牌
						</el-button>
						<el-button
							class="mr10"
							size="small"
							type="text"
							@click="del(scope.row)"
						>删除卡牌
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

		<!-- s新增卡牌 -->
		<el-dialog
			:close-on-click-modal="false"
			:visible.sync="add_visible"
			class="add_staff"
			title="新增卡片"
			width="70%"
			top="5vh"
		>

			<el-form ref="addForm" :model="addForm" :rules="addRules" label-position="left" :label-width="formLabelWidth">

				<el-form-item label="关联卡类别主键id：" prop="category_id">
					<el-input v-model="addForm.category_id" autocomplete="off" placeholder="（数值）请输入关联卡类别主键id" />
				</el-form-item>

				<el-form-item label="卡名称：" prop="card_name">
					<el-input v-model="addForm.card_name" autocomplete="off" placeholder="请输入卡名称" />
				</el-form-item>

				<el-form-item label="卡类型：">
					<el-select
						v-model="addForm.type"
						clearable
						placeholder="请选择"
					>
						<!--            <el-option label="装备" :value="0"></el-option>-->
						<!--            <el-option label="辅助" :value="1"></el-option>-->
						<el-option label="装备" value="0"></el-option>
						<el-option label="辅助" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="是否触发所有玩家：">
					<el-select
						v-model="addForm.is_all"
						clearable
						placeholder="请选择"
					>
						<el-option label="针对单玩家" value="0"></el-option>
						<el-option label="针对所有玩家" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="所需精力：" prop="energy">
					<el-input v-model="addForm.energy" autocomplete="off" placeholder="（数值）请输入所需精力" />
				</el-form-item>

				<el-form-item label="收入属性(指该卡对收入带来的值，通常为被动收入)：" prop="in">
					<el-input v-model="addForm.in" autocomplete="off" placeholder="（数值）请输入收入属性" />
				</el-form-item>

				<el-form-item label="支出(通常为每月净现金流的贷款)：" prop="out">
					<el-input v-model="addForm.out" autocomplete="off" placeholder="（数值）请输入支出" />
				</el-form-item>

				<el-form-item label="资产数(股票为持股数,房产为首付)：" prop="assets_num">
					<el-input v-model="addForm.assets_num" autocomplete="off" placeholder="（数值）请输入资产数" />
				</el-form-item>

				<el-form-item label="资产价值(股票时为股价,房产时为房产总价)：" prop="assets_value">
					<el-input v-model="addForm.assets_value" autocomplete="off" placeholder="（数值）请输入资产价值" />
				</el-form-item>

				<el-form-item label="负债(通常为银行指明的贷款数)：" prop="liabilities">
					<el-input v-model="addForm.liabilities" autocomplete="off" placeholder="（数值）请输入负债" />
				</el-form-item>

				<el-form-item label="是否需要banker跟进处理：">
					<el-select
						v-model="addForm.is_banker_follow"
						clearable
						placeholder="请选择"
					>
						<el-option label="不需要" value="0"></el-option>
						<el-option label="需要" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="方法(后端接口参照此方法名称来定位调用方法处理)：" prop="method">
					<el-input v-model="addForm.method" autocomplete="off" placeholder="请输入方法" />
				</el-form-item>

				<el-form-item label="关联的要触发的卡id(以,号隔开或键值对的json)：" prop="relation_card">
					<el-input v-model="addForm.relation_card" autocomplete="off" placeholder="请输入关联的要触发的卡id" />
				</el-form-item>

				<el-form-item label="抽到卡时是否需要填写：">
					<el-select
						v-model="addForm.is_need_fill"
						clearable
						placeholder="请选择"
					>
						<el-option label="不需要" value="0"></el-option>
						<el-option label="需要" value="1"></el-option>
					</el-select>
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

				<el-form-item label="卡的类别：">
					<el-select
						v-model="addForm.class"
						clearable
						placeholder="请选择"
					>
						<el-option label="无类别" value="0"></el-option>
						<el-option label="房产" value="1"></el-option>
						<el-option label="股票" value="2"></el-option>
						<el-option label="企业投资" value="3"></el-option>
						<el-option label="觉察投资" value="4"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="卡片描述：" prop="describe">
					<el-input v-model="addForm.describe" autocomplete="off" placeholder="请输入卡片描述" />
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addSubmit('addForm')">添加卡牌</el-button>
			</div>
		</el-dialog>
		<!-- e新增卡牌 -->

		<!-- s编辑卡牌信息 -->
		<el-dialog
			:close-on-click-modal="false"
			:visible.sync="edit_visible"
			class="add_staff"
			title="编辑卡片"
			width="70%"
			top="5vh"
		>

			<el-form ref="editForm" :model="editForm" :rules="editRules" label-position="left" :label-width="formLabelWidth">

				<el-form-item label="卡表主键id：" prop="id">
					<el-input v-model="editForm.id" autocomplete="off" disabled placeholder="（数值）请输入卡表主键id" />
				</el-form-item>

				<el-form-item label="关联卡类别主键id：" prop="category_id">
					<el-input v-model="editForm.category_id" autocomplete="off" placeholder="（数值）请输入关联卡类别主键id" />
				</el-form-item>

				<el-form-item label="卡名称：" prop="card_name">
					<el-input v-model="editForm.card_name" autocomplete="off" placeholder="请输入卡名称" />
				</el-form-item>

				<el-form-item label="卡类型：">
					<el-select
						v-model="editForm.type"
						clearable
						placeholder="请选择"
					>
						<!--            <el-option label="装备" :value="0"></el-option>-->
						<!--            <el-option label="辅助" :value="1"></el-option>-->
						<el-option label="装备" value="0"></el-option>
						<el-option label="辅助" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="是否触发所有玩家：">
					<el-select
						v-model="editForm.is_all"
						clearable
						placeholder="请选择"
					>
						<el-option label="针对单玩家" value="0"></el-option>
						<el-option label="针对所有玩家" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="所需精力：" prop="energy">
					<el-input v-model="editForm.energy" autocomplete="off" placeholder="（数值）请输入所需精力" />
				</el-form-item>

				<el-form-item label="收入属性(指该卡对收入带来的值，通常为被动收入)：" prop="in">
					<el-input v-model="editForm.in" autocomplete="off" placeholder="（数值）请输入收入属性" />
				</el-form-item>

				<el-form-item label="支出(通常为每月净现金流的贷款)：" prop="out">
					<el-input v-model="editForm.out" autocomplete="off" placeholder="（数值）请输入支出" />
				</el-form-item>

				<el-form-item label="资产数(股票为持股数,房产为首付)：" prop="assets_num">
					<el-input v-model="editForm.assets_num" autocomplete="off" placeholder="（数值）请输入资产数" />
				</el-form-item>

				<el-form-item label="资产价值(股票时为股价,房产时为房产总价)：" prop="assets_value">
					<el-input v-model="editForm.assets_value" autocomplete="off" placeholder="（数值）请输入资产价值" />
				</el-form-item>

				<el-form-item label="负债(通常为银行指明的贷款数)：" prop="liabilities">
					<el-input v-model="editForm.liabilities" autocomplete="off" placeholder="（数值）请输入负债" />
				</el-form-item>

				<el-form-item label="是否需要banker跟进处理：">
					<el-select
						v-model="editForm.is_banker_follow"
						clearable
						placeholder="请选择"
					>
						<el-option label="不需要" value="0"></el-option>
						<el-option label="需要" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="方法(后端接口参照此方法名称来定位调用方法处理)：" prop="method">
					<el-input v-model="editForm.method" autocomplete="off" placeholder="请输入方法" />
				</el-form-item>

				<el-form-item label="关联的要触发的卡id(以,号隔开或键值对的json)：" prop="relation_card">
					<el-input v-model="editForm.relation_card" autocomplete="off" placeholder="请输入关联的要触发的卡id" />
				</el-form-item>

				<el-form-item label="抽到卡时是否需要填写：">
					<el-select
						v-model="editForm.is_need_fill"
						clearable
						placeholder="请选择"
					>
						<el-option label="不需要" value="0"></el-option>
						<el-option label="需要" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="状态：">
					<el-select
						v-model="editForm.status"
						clearable
						placeholder="请选择"
					>
						<el-option label="禁用" value="0"></el-option>
						<el-option label="启用" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="卡的类别：">
					<el-select
						v-model="editForm.class"
						clearable
						placeholder="请选择"
					>
						<el-option label="无类别" value="0"></el-option>
						<el-option label="房产" value="1"></el-option>
						<el-option label="股票" value="2"></el-option>
						<el-option label="企业投资" value="3"></el-option>
						<el-option label="觉察投资" value="4"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="卡片描述：" prop="describe">
					<el-input v-model="editForm.describe" autocomplete="off" placeholder="请输入卡片描述" />
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editSubmit('editForm')">保存修改</el-button>
			</div>
		</el-dialog>
		<!-- e编辑卡牌信息 -->

	</div>
</template>

<script>
import { GetCardList, OperateCard, DeleteCard } from '@/api/admin'

export default {
	name: 'CashManagement',
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
				category_id: '',
				type: '',
				is_all: '',
				is_banker_follow: '',
				is_need_fill: '',
				status: '',
				class: ''
			},
			// 新增卡牌
			add_visible: false,
			addForm: {
				id: '', // 有id则修改，无id则新增
				category_id: '',
				card_name: '',
				type: '',
				is_all: '',
				energy: '',
				in: '',
				out: '',
				assets_num: '',
				assets_value: '',
				liabilities: '',
				is_banker_follow: '',
				method: '',
				relation_card: '',
				is_need_fill: '',
				status: '',
				class: '',
				describe: ''
			},
			addRules: {
				// id: [ { required: true, message: '不能为空', change: 'blue' } ],
				category_id: [ { required: false, message: '不能为空', change: 'blue' } ],
				card_name: [ { required: false, message: '不能为空', change: 'blue' } ],
				type: [ { required: false, message: '不能为空', change: 'blue' } ],
				is_all: [ { required: false, message: '不能为空', change: 'blue' } ],
				energy: [ { required: false, message: '不能为空', change: 'blue' } ],
				in: [ { required: false, change: 'blue' } ],
				out: [ { required: false, message: '不能为空', change: 'blue' } ],
				assets_num: [ { required: false, message: '不能为空', change: 'blue' } ],
				assets_value: [ { required: false, message: '不能为空', change: 'blue' } ],
				liabilities: [ { required: false, message: '不能为空', change: 'blue' } ],
				is_banker_follow: [ { required: false, message: '不能为空', change: 'blue' } ],
				method: [ { required: false, message: '不能为空', change: 'blue' } ],
				relation_card: [ { required: false, message: '不能为空', change: 'blue' } ],
				is_need_fill: [ { required: false, message: '不能为空', change: 'blue' } ],
				status: [ { required: false, message: '不能为空', change: 'blue' } ],
				class: [ { required: false, message: '不能为空', change: 'blue' } ],
				describe: [ { required: false, message: '不能为空', change: 'blue' } ]
			},
			// 编辑卡牌
			edit_visible: false,
			editForm: {
				id: '', // 有id则修改，无id则新增
				category_id: '',
				card_name: '',
				type: '',
				is_all: '',
				energy: '',
				in: '',
				out: '',
				assets_num: '',
				assets_value: '',
				liabilities: '',
				is_banker_follow: '',
				method: '',
				relation_card: '',
				is_need_fill: '',
				status: '',
				class: '',
				describe: ''
			},
			editRules: {
				id: [ { required: true, message: '不能为空', change: 'blue' } ],
				category_id: [ { required: false, message: '不能为空', change: 'blue' } ],
				card_name: [ { required: false, message: '不能为空', change: 'blue' } ],
				type: [ { required: false, message: '不能为空', change: 'blue' } ],
				is_all: [ { required: false, message: '不能为空', change: 'blue' } ],
				energy: [ { required: false, message: '不能为空', change: 'blue' } ],
				in: [ { required: false, change: 'blue' } ],
				out: [ { required: false, message: '不能为空', change: 'blue' } ],
				assets_num: [ { required: false, message: '不能为空', change: 'blue' } ],
				assets_value: [ { required: false, message: '不能为空', change: 'blue' } ],
				liabilities: [ { required: false, message: '不能为空', change: 'blue' } ],
				is_banker_follow: [ { required: false, message: '不能为空', change: 'blue' } ],
				method: [ { required: false, message: '不能为空', change: 'blue' } ],
				relation_card: [ { required: false, message: '不能为空', change: 'blue' } ],
				is_need_fill: [ { required: false, message: '不能为空', change: 'blue' } ],
				status: [ { required: false, message: '不能为空', change: 'blue' } ],
				class: [ { required: false, message: '不能为空', change: 'blue' } ],
				describe: [ { required: false, message: '不能为空', change: 'blue' } ]
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
			GetCardList(this.infoForm)
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
				category_id: '',
				type: '',
				is_all: '',
				is_banker_follow: '',
				is_need_fill: '',
				status: '',
				class: ''
			}
			this.getList()
		},
		// 编辑
		edit(e) {
			this.editForm = {
				// 不用create_time
				id: String(e.id),
				category_id: String(e.category_id),
				card_name: e.card_name,
				type: String(e.type),
				is_all: String(e.is_all),
				energy: String(e.energy),
				in: String(e.in),
				out: String(e.out),
				assets_num: String(e.assets_num),
				assets_value: String(e.assets_value),
				liabilities: String(e.liabilities),
				is_banker_follow: String(e.is_banker_follow),
				method: e.method,
				relation_card: e.relation_card,
				is_need_fill: String(e.is_need_fill),
				status: String(e.status),
				class: String(e.class),
				describe: e.describe
			}
			this.edit_visible = true
		},
		// 删除
		del(e) {
			this.$confirm('确定删除该卡牌?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				DeleteCard({ id: e.id })
					.then(() => {
						this.$message.success('删除卡牌成功！')
						this.getList()
					})
			})
				.catch(() => {
				})
		},

		// 新增卡牌
		addSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				// 若必填项不为空
				if (valid) {
					OperateCard(this.addForm)
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
					OperateCard(this.editForm)
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
