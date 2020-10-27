class RGBA {

  constructor(red, green, blue, alpha = 1) {
    this.Red = red;
    this.Green = green;
    this.Blue = blue;
    this.Alpha = alpha;
    this.CSSProperty = 'rgba(' 
          + red + ',' 
          + green + ',' 
          + blue + ',' 
          + alpha + ') ';
  };

}

// The gradient is described by label parameters: position on the scale (%); content of red, green and blue; alpha channel.

class ColorLabel {

  constructor(position, color) {
    this.Position = position;
    this.themeColor = color;
  };

}


// The default gradient contains red, yellow, green, cyan, and blue colors.

class GradientDefault {
  
  constructor() {
   this.Name = 'Default';
   this.BelowLimitColor = new RGBA(255, 255, 255);
   this.Labels = [
     new ColorLabel(0, new RGBA(255, 0, 0)),
     new ColorLabel(25, new RGBA(255, 255, 0)),
     new ColorLabel(50, new RGBA(0, 255, 0)),
     new ColorLabel(75, new RGBA(0, 255, 255)),
     new ColorLabel(100, new RGBA(0, 0, 255))
   ];
   this.AboveLimitColor = new RGBA(0, 0, 0);
  };

}

// The iron gradient contains white, yellow, orange, red, magenta, blue, and black colors.

class GradientIron {
  
  constructor() {
   this.Name = 'Iron';
   this.BelowLimitColor = new RGBA(255, 255, 255);
   this.Labels = [
    new ColorLabel(0, new RGBA(255, 255, 255)),
    new ColorLabel(15, new RGBA(250, 230, 35)),
    new ColorLabel(30, new RGBA(250, 185, 0)),
    new ColorLabel(50, new RGBA(240, 80, 35)),
    new ColorLabel(67, new RGBA(170, 10, 170)),
    new ColorLabel(90, new RGBA(15, 5, 100)),
    new ColorLabel(100, new RGBA(0, 0, 0))
   ];
   this.AboveLimitColor = new RGBA(0, 0, 0);
  };

}

// The Aeroset gradient contains special red, yellow, green, cyan, and blue colors.

class GradientAeroset {
  
  constructor() {
   this.Name = 'Aeroset';
   this.BelowLimitColor = new RGBA(255, 255, 255);
   this.Labels = [
    new ColorLabel(0, new RGBA(249, 30, 30)),
    new ColorLabel(10, new RGBA(252, 102, 28)),
    new ColorLabel(30, new RGBA(242, 235, 38)),
    new ColorLabel(50, new RGBA(38, 242, 84)),
    new ColorLabel(70, new RGBA(28, 252, 204)),
    new ColorLabel(90, new RGBA(28, 173, 252)),
    new ColorLabel(100, new RGBA(28, 56, 252))
   ];
   this.AboveLimitColor = new RGBA(38, 38, 38);
  };

}

export default class GradientFillService {

  constructor(gradientType = 'Default', minParameter =-100, maxParameter = 100) {
    this.gradientTypes = [
      new GradientDefault(),
      new GradientIron(),
      new GradientAeroset()
    ];
    setGradient(gradientType);
    setMinParameter(minParameter);
    setMaxParameter(maxParameter);
  };

  setGradient(gradientType) {
    this.Gradient = this.gradientTypes.find(gradient => gradient.Name === gradientType);
  };

  setMinParameter(minParameter) {
    this.MinParameter = minParameter;
  };

  setMaxParameter(maxParameter) {
    this.MaxParameter = maxParameter;
  };


  getColor(parameter) {
    
    // Calculate parameter position on the gradient scale (%)
    let parameterPosition = (parameter - this.MinParameter) / (this.MaxParameter - this.MinParameter) * 100;

    if (parameterPosition < 0) {
      return  this.Gradient.BelowLimitColor;
    }

    if (parameterPosition > 100) {
     return  this.Gradient.AboveLimitColor;
    }

    let previousLabel = this.Gradient.Labels.sort((label1, label2) => label2.Position - label1.Position).find(label => label.Position <= parameterPosition);

    let nextLabel = this.Gradient.Labels.sort((label1, label2) => label1.Position - label2.Position).find(label => label.Position >= parameterPosition);

    if (previousLabel == nextLabel) {
      return previousLabel.Color;
    } 

    else {
      let red = Math.round(previousLabel.Color.Red - (previousLabel.Color.Red - nextLabel.Color.Red) / (previousLabel.Position - nextLabel.Position) * (previousLabel.Position - parameterPosition));
      let green = Math.round(previousLabel.Color.Green - (previousLabel.Color.Green - nextLabel.Color.Green) / (previousLabel.Position - nextLabel.Position) * (previousLabel.Position - parameterPosition));
      let blue = Math.round(previousLabel.Color.Blue - (previousLabel.Color.Blue - nextLabel.Color.Blue) / (previousLabel.Position - nextLabel.Position) * (previousLabel.Position - parameterPosition));
      let alpha = Math.round(previousLabel.Color.Alpha - (previousLabel.Color.Alpha - nextLabel.Color.Alpha) / (previousLabel.Position - nextLabel.Position) * (previousLabel.Position - parameterPosition));
      
      let color = new RGBA(red, green, blue, alpha);
      
      return(color);
    };

  };

  getGradientAsCSSProperty(direction = 'to bottom') {
    
    let backgroundProperty = 'linear-gradient(' + direction + ', ';
    
    for (let label in this.Gradient.Labels) {
      backgroundProperty += ' rgba(' 
        + this.Gradient.Labels[label].Color.Red + ',' 
        + this.Gradient.Labels[label].Color.Green + ',' 
        + this.Gradient.Labels[label].Color.Blue + ',' 
        + this.Gradient.Labels[label].Color.Alpha + ') ' 
        + this.Gradient.Labels[label].Position + '%, ';
    };

    backgroundProperty = backgroundProperty.slice(0, -2) + ')';

    return backgroundProperty;

  };
  

}
