class Recommendation {
	async getRecommendation(req, res) {
		const { industry, production, params } = req.body;

		const recommendation = new Strategy(production, industry, params);

		res.send({ recommendation: recommendation.getStrategyRecommendation() });
	}
}

class Strategy {
	recommendation = { standardMessage: "Контекстная реклама - это различные объявления (текстовые, графические, видео), которые показываются пользователям в соответствии с их поисковыми запросами, интересами или поведением в интернете. Контекстная реклама показывается в поисковых системах, на различных сайтах, в мобильных приложениях и на других ресурсах. Она более дорогая, но и более эффективная. Подходит для товаров и услуг, имеющих среднюю стоимость, или стоимость выше средней. Площадки для контекстной рекламы - авито, Яндекс.Маркет, Яндекс.Директ, Google Ads. \n Таргетированная реклама или по простому «таргет» представляет собой объявления, которые транслируются определенной целевой аудитории на основе общедоступной информации из профилей пользователей. Target в переводе с английского означает – цель. Таким образом, таргетированная реклама – это направленное воздействие на целевую аудиторию, которая с высокой степенью вероятности интересуется товаром или услугой. Отличие в способах сегментации ЦА: таргет использует данные пользователей, а контекст – ключевые слова, которые вводятся в строку поиска." };

	production = null;
	industry = null;
	params = null;

	constructor(production, industry, params) {
		this.production = production;
		this.industry = industry;
		this.params = params;
	}

	getStrategyRecommendation() {
		switch (this.production) {
			case "product":
				this.productStrategy(this.industry, this.params.product);
				return this.recommendation;
			case "service":
				this.serviceStrategy(this.industry, this.params.services);
				return this.recommendation;
		}
	}

	productStrategy(industry, data) {
		switch (industry) {
			case "commerce":
				const { middleAmount, assortment } = data.commerce;

				if (middleAmount <= 1000 && assortment < 30) {
					this.recommendation.message = "Рекомендуется использовать таргетированную рекламу в качестве основной, а также небольшую часть бюджета направить в контекстную рекламу. ";
					break;
				}

				if (middleAmount <= 5000 && assortment < 20) {
					this.recommendation.message = "Рекомендуется использовать таргетированную рекламу в равной доле с контекстной. Также рекомендуется продвижение в соц.сетях, создание собственных площадок и/или групп.";
					break;
				}

				if (middleAmount > 5000 && assortment < 10) {
					this.recommendation.message = "Рекомендуется использовать контекстную рекламу в качетстве основной, небольшую часть бюджета направить в таргетированную рекламу, а также создать лэндинг, группы в соц.сетях";
					break;
				}

				if (middleAmount > 5000 && assortment > 10 && assortment < 20) {
					this.recommendation.message = "Рекомендуется использовать контекстную рекламу в качетстве основной, небольшую часть бюджета направить в таргетированную рекламу, а также создать собственный интернет-магазин, группы в соц.сетях, и заняться их активным продвижением";
					break;
				}

				if (middleAmount > 5000 && assortment > 30) {
					this.recommendation.message = "Рекомендуется использовать контекстную рекламу в качетстве основной, небольшую часть бюджета направить в таргетированную рекламу, а также создать собственный интернет-магазин, группы в соц.сетях, заняться их активным продвижением. Также рекомендуется работа над собственным брендом. Наши дизайнеры могут придумать Вам логотип, а маркетологи сделать его узнаваемым!";
					break;
				}

				this.recommendation.message = "Указанные параметры требуют более детальной обработки. Для этого с Вами в близжайшее свяжется наш менеджер.";
				break;

			case "realEstate":
				this.recommendation.message = "Рекомендуется использовать контекстную рекламу в качетстве основной, небольшую часть бюджета направить в таргетированную рекламу.";
				break;
		}
	}

	serviceStrategy(industry, data) {
		switch (industry) {
			default:
				const client = data.client.value;

				if (client === "individualPerson") {
					this.recommendation.message = "Рекомендуется использовать таргетированную рекламу в качестве основной, а также небольшую часть бюджета направить в контекстную рекламу.";
					break;
				}

				if (client === "entityPerson") {
					this.recommendation.message = "Рекомендуется использовать контекстную рекламу в качестве основной, а также часть бюджета направить на тематические информационные ресурсы, сайты-партеры, заказывать рекламу у отраслевых медийных личностей";
					break;
				}
		}
	}
}

module.exports = new Recommendation();