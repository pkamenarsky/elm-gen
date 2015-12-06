module Main (main) where

{-| The main module
@docs main
-}

import Html exposing (Html, div, button, text)
import Html.Attributes as Html exposing (style)
import Html.Events exposing (onClick)
import StartApp as StartApp

import Task
import Effects as Fx exposing (Effects, Never)

import Components exposing (..)
import Slider exposing (..)

-- MAIN ------------------------------------------------------------------------

port tasks : Signal (Task.Task Never ())
port tasks = app.tasks

app : StartApp.App Model
app = StartApp.start { view = view, update = update, init = init, inputs = {- THIS NEEDS TO BE ADDED -} [Signal.map C Components.signal] }

{-| Main -}
main : Signal Html
main = app.html

init : (Model, Effects Action)
init = let (cm, fx) = Components.init in
  (
    { counter = 0
    {- THIS NEEDS TO BE ADDED -}
    , components = cm
    } , Fx.map C fx
  )

type alias Model = { counter : Int, components : Components.Model }

view : Signal.Address Action -> Model -> Html
view address model =
  div []
    [ button [ onClick address Decrement ] [ text "-" ]
    , div [] [ text (toString model) ]
    , Slider.view model.components.mySlider (Components.addressFor ComponentMySliderAction)
    , button [ onClick address Increment ] [ text "+" ]
    ]

type Action = Increment | Decrement {- THIS NEEDS TO BE ADDED -} | C Components.Action

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    Increment -> ( { model | counter = model.counter + 1 }, Fx.none )
    Decrement -> ( { model | counter = model.counter - 1 }, Fx.none )

    -- THIS NEEDS TO BE ADDED ------------------------------------------------------
    C action' -> let (model', fx') = Components.update action' model.components
      in ({model | components = model'}, Fx.map C fx')
