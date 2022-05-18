import { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";

const Recommendation = ({ onSubmit }) => {
	const [production, setProductionType] = useState([]);
	const [productionTypes] = useState([
		{ label: "Продукт/собественность", value: "product" },
		{ label: "Услуга", value: "service" },
	]);

	const [industry, setIndustryType] = useState([]);
	const [industryTypes] = useState({
		product: [
			{ label: "Торговля", value: "commerce" },
			{ label: "Недвижимость", value: "realEstate" },
		],
		service: [
			{ label: "Информационные услуги", value: "ITServices" },
			{ label: "Финансовые услуги", value: "FinServices" },
			{ label: "Образовательные услуги", value: "EducationServices" },
		],
	});

	const [specificTypes, setSpecificTypes] = useState({
		product: {
			commerce: {
				middleAmount: 0,
				assortment: 0,
			},
			realEstate: {},
		},
		services: {
			clientTypes: [
				{ label: "Юридическим лицом", value: "entityPerson" },
				{ label: "Физическим лицом", value: "individualPerson" },
			],
			client: [],
		},
	});

	useEffect(() => {
		console.log(production, industry, specificTypes);
		setIndustryType([]);
	}, [production]);

	return (
		<div className="Recommendation" style={{ width: "450px" }}>
			<form>
				<div className="select-container" style={{ width: "100%" }}>
					<Select
						placeholder="Выберите вид продукции..."
						classNamePrefix="custom-select"
						options={productionTypes}
						value={production}
						onChange={(e) => setProductionType(e)}
						isSearchable
					/>
				</div>
				<div className="select-container" style={{ width: "100%" }}>
					<Select
						placeholder="Выберите отрасль..."
						classNamePrefix="custom-select"
						isDisabled={!production?.value}
						options={
							production.value === "product"
								? industryTypes.product
								: industryTypes.service
						}
						value={industry}
						onChange={(e) => setIndustryType(e)}
						isSearchable
					/>
				</div>
				{production.value === "product" && industry.value === "commerce" && (
					<>
						<Input
							required
							type="number"
							name="Средняя цена товара/товаров(руб.)"
							value={specificTypes.product.commerce.middleAmount}
							onChange={(value) =>
								setSpecificTypes((prev) => {
									const newState = JSON.parse(JSON.stringify(prev));
									newState.product.commerce.middleAmount = value;
									return newState;
								})
							}
						/>
						<Input
							required
							type="number"
							name="Средняя количество товаров(шт.)"
							value={specificTypes.product.commerce.assortment}
							onChange={(value) =>
								setSpecificTypes((prev) => {
									const newState = JSON.parse(JSON.stringify(prev));
									newState.product.commerce.assortment = value;
									return newState;
								})
							}
						/>
					</>
				)}
				{production.value === "service" && (
					<div className="select-container" style={{ width: "100%" }}>
						<Select
							placeholder="Клиент является..."
							classNamePrefix="custom-select"
							options={specificTypes.services.clientTypes}
							value={specificTypes.services.client}
							onChange={(values) =>
								setSpecificTypes((prev) => {
									const newState = JSON.parse(JSON.stringify(prev));
									newState.services.client = { ...values };
									return newState;
								})
							}
							isSearchable
						/>
					</div>
				)}
				<Button text="Получить рекомендацию" cb={() => onSubmit({})} />
			</form>
		</div>
	);
};

export default Recommendation;
