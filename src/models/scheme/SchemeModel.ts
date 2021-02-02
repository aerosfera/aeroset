import CalculationModel from "../calculation/CalculationModel";
import Scheme from "./Scheme";

export default interface SchemeModel extends Scheme {
    calculationModels: CalculationModel[]
}