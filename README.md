# elm-gen

`elm-gen` generates the necessary but repetetive plumbing required when dealing with components in Elm.

## Installation

    git clone https://github.com/pkamenarsky/elm-gen
    npm install (add -g for global installation)

## Usage

Given a `components.json` file like this:

    {
      "mySlider": "Slider",
      "siderbarSlider": "Slider"
    }

`elm-gen` generates the following file:

    module Components where
    
    import Slider
    import Slider
    
    import Effects as Fx exposing (Effects, Never)
    
    mailbox : Signal.Mailbox Action
    mailbox = Signal.mailbox NoOpAction
    
    addressFor = Signal.forwardTo mailbox.address
    
    signal = mailbox.signal
    
    type alias Model = { mySlider : Slider.Model, siderbarSlider : Slider.Model }
    
    type Action = NoOpAction | ComponentMySliderAction Slider.Action | ComponentSiderbarSliderAction Slider.Action
    
    init : (Model, Effects Action)
    init = let (mySliderModel, mySliderFx) = Slider.init
               (siderbarSliderModel, siderbarSliderFx) = Slider.init in
      (
        { mySlider = mySliderModel
        , siderbarSlider = siderbarSliderModel
        }
      , Fx.batch
          [ Fx.map ComponentMySliderAction mySliderFx
          , Fx.map ComponentSiderbarSliderAction siderbarSliderFx
          ]
      )
    
    update : Action -> Model -> (Model, Effects Action)
    update action model = case action of
      ComponentMySliderAction action -> let (m, fx) = Slider.update action model.mySlider
        in ({model | mySlider = m}, Fx.map ComponentMySliderAction fx)
      ComponentSiderbarSliderAction action -> let (m, fx) = Slider.update action model.siderbarSlider
        in ({model | siderbarSlider = m}, Fx.map ComponentSiderbarSliderAction fx)
      NoOpAction -> (model, Fx.none)

The output can then be imported and used like usual (see `example` folder).

## Notes

Obviously this script has some raw edges (two `import Slider`s above), but it should convey the general idea.

Patches welcome of course :)
