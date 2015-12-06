module Slider where

import Html exposing (Html, div, button, text)
import Html.Attributes as Html exposing (style)
import Html.Events exposing (onClick)
import StartApp as StartApp

import Task
import Effects as Fx exposing (Effects, Never)

type Action = NoOp | Press

type alias Model = { isPressed : Bool }

init : (Model, Effects Action)
init = ( { isPressed = False }, Fx.none)

view : Model -> Signal.Address Action -> Html
view model address = div
  [ style [("width", "100px"), ("height", "100px"), ("backgroundColor", "#ccc")]
  , onClick address Press ]
  [ Html.text <| toString model.isPressed ]

update : Action -> Model -> (Model, Effects Action)
update action model = case action of
  NoOp -> ( model, Fx.none )
  Press -> ( { model | isPressed = True }, Fx.none )

