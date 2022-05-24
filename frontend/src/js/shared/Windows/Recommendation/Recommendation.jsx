import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";
import { getURL } from "../../../Utils";

const Recommendation = () => {
	const [recommendationMessage, setRecommMessage] = useState("");
	const URL = getURL();

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
		setIndustryType([]);
	}, [production]);

	const getRecommendation = async (data) => {
		try {
			const answer = await axios.post(URL + "/api/getRecommendation", {
				production: data.production,
				industry: data.industry,
				params: data.specificTypes,
			});
			console.log(answer);
			setRecommMessage(
				`${answer.data.recommendation.standardMessage}${answer.data.recommendation.message}`
			);
			// setSignUpWindowState(false);
		} catch (e) {
			// setErrorSignUpMessage(e.response.data.error || "Something went wrong.");
			console.log("Error: ", e.response.data.error);
		}
	};

	if (recommendationMessage) {
		return (
			<div className="Recommendation" style={{ width: "450px" }}>
				<p>{recommendationMessage}</p>
			</div>
		);
	}

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
				<Button
					text="Получить рекомендацию"
					cb={() =>
						getRecommendation({
							production: production.value,
							industry: industry.value,
							specificTypes,
						})
					}
				/>
			</form>
		</div>
	);
};

export default Recommendation;
