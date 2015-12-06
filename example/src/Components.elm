module Components where

import Slider

import Effects as Fx exposing (Effects, Never)

mailbox : Signal.Mailbox Action
mailbox = Signal.mailbox NoOpAction

addressFor = Signal.forwardTo mailbox.address

signal = mailbox.signal

type alias Model = { mySlider : Slider.Model }

type Action = NoOpAction | ComponentMySliderAction Slider.Action

init : (Model, Effects Action)
init = let (mySliderModel, mySliderFx) = Slider.init in
  (
    { mySlider = mySliderModel
    }
  , Fx.batch
      [ Fx.map ComponentMySliderAction mySliderFx
      ]
  )

update : Action -> Model -> (Model, Effects Action)
update action model = case action of
  ComponentMySliderAction action -> let (m, fx) = Slider.update action model.mySlider in ({model | mySlider = m}, Fx.map ComponentMySliderAction fx)
  NoOpAction -> (model, Fx.none)
